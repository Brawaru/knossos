// @ts-check

// TODO(Brawaru): backport and refresh this module

import { createIntl, createIntlCache } from '@formatjs/intl'
import { computed, reactive } from 'vue'
import { formatCompactNumber } from './compactNumber'
import { formatCustomMessage } from './customMessage'
import { createIntlFormattedComponent } from './IntlFormatted'
import { formatTimeDifference } from './timeDifferenceFormatter'

/**
 * @typedef {object} IntlFormatAliases
 * @property {import('@formatjs/intl').IntlShape['formatDate']} date
 * @property {import('@formatjs/intl').IntlShape['formatDateTimeRange']} dateTimeRange
 * @property {import('@formatjs/intl').IntlShape['formatDisplayName']} displayName
 * @property {import('@formatjs/intl').IntlShape['formatList']} list
 * @property {import('@formatjs/intl').IntlShape['formatNumber']} number
 * @property {import('@formatjs/intl').IntlShape['formatPlural']} plural
 * @property {import('@formatjs/intl').IntlShape['formatRelativeTime']} relativeTime
 * @property {import('@formatjs/intl').IntlShape['formatTime']} time
 * @property {import('./compactNumber').CompactNumberFormatFunction} compactNumber
 * @property {import('./timeDifferenceFormatter').FormatTimeDifferenceFormatter} timeDifference
 * @property {import('./customMessage').CustomMessageFormatter} customMessage
 */

/**
 * @private
 * @typedef {import('@formatjs/intl').IntlShape<
 *   import('vue').VNode | import('./compactNumber').CompactNumber
 * >} IntlShape
 */

export class IntlController {
  /**
   * @param {string} defaultLocale Locale to use by default, it will be imported
   *   on import.
   */
  constructor(defaultLocale = 'en-US', defaultMessages = Object.create(null)) {
    /**
     * Intl cache used to avoid memory leakage and performance.
     *
     * @private
     */
    this._intlCache = createIntlCache()

    const state = reactive({
      /** Locale to be used by default. */
      defaultLocale,

      /** Currently used locale. */
      currentLocale: defaultLocale,

      /** @type {Record<string, import('./i18n.types').MessagesMap>} */
      localeMessages: Object.assign({
        [defaultLocale]: defaultMessages,
      }),
    })

    /** @private */
    this._state = state

    // Messages computation

    const $defaultMessages = computed(
      () => state.localeMessages[state.defaultLocale]
    )

    /** @private */
    this._defaultMessages = $defaultMessages

    const messages = computed(() => {
      if (state.currentLocale === state.defaultLocale) {
        return $defaultMessages.value
      } else {
        return Object.assign(
          Object.create(null),
          $defaultMessages.value,
          state.localeMessages[state.currentLocale]
        )
      }
    })

    const intl = computed(() => {
      return /** @type {IntlShape} */ (
        createIntl(
          {
            defaultLocale: state.defaultLocale,
            locale: state.currentLocale,
            messages: messages.value,
          },
          this._intlCache
        )
      )
    })

    /** @private */
    this._intl = intl

    const formats = computed(
      /** @returns {IntlFormatAliases} */
      () => {
        const $intl = intl.value
        return {
          date: $intl.formatDate.bind($intl),
          dateTimeRange: $intl.formatDateTimeRange.bind($intl),
          displayName: $intl.formatDisplayName.bind($intl),
          list: $intl.formatList,
          number: $intl.formatNumber.bind($intl),
          plural: $intl.formatPlural.bind($intl),
          relativeTime: $intl.formatRelativeTime.bind($intl),
          time: $intl.formatTime.bind($intl),
          compactNumber: formatCompactNumber.bind(
            null,
            $intl,
            $intl.formatters.getNumberFormat
          ),
          timeDifference: formatTimeDifference.bind(
            null,
            $intl.formatRelativeTime
          ),
          customMessage: formatCustomMessage.bind(null, $intl),
        }
      }
    )

    /** @private */
    this._formats = formats

    const intlLocale = computed(() => {
      return new Intl.Locale(intl.value.locale)
    })

    /** @private */
    this._intlLocale = intlLocale

    /**
     * Default locale used by this controller.
     *
     * @private
     */
    this._defaultLocale = defaultLocale
  }

  get defaultLocale() {
    return this._state.defaultLocale
  }

  get defaultMessages() {
    return this._defaultMessages.value
  }

  get locale() {
    return this._intl.value.locale
  }

  /** @type {IntlShape} */
  get intl() {
    return this._intl.value
  }

  /** @type {IntlFormatAliases} */
  get formats() {
    return this._formats.value
  }

  /** @type {Intl.Locale} */
  get intlLocale() {
    return this._intlLocale.value
  }

  /**
   * Loads locale data.
   *
   * @param {string} locale Locale which messages need to be added.
   * @param {import('./i18n.types').MessagesMap} messages Locale messages.
   */
  addLocaleData(locale, messages) {
    this._state.localeMessages[locale] = messages
  }

  /**
   * (Re-)initialises the controller with the provided locale and messages.
   *
   * @param {string} locale BCP47 locale code to best as used locale.
   * @param {import('./i18n.types').MessagesMap} messages Messages for the
   *   provided locale.
   */
  initWith(locale, messages) {
    this.addLocaleData(locale, messages)
    this._state.currentLocale = locale
  }
}

/**
 * @template T Type of the reference.
 * @typedef {object} Ref
 * @property {T} current Currently held reference.
 */

/**
 * @template T Type of the reference.
 * @param {T} initialValue Initial reference.
 * @returns {Ref<T>} Reference object.
 */
export function createRef(initialValue) {
  return {
    current: initialValue,
  }
}

/**
 * Creates an injector for any object instance to which Intl helpers need to be
 * injected. All injected properties will be prefixed with dollar sign (`$`),
 * they are added using `Object.defineProperty` and marked as configurable, thus
 * can be re-defined, but not modified.
 *
 * @param {object} target Target to which properties will be injected.
 * @returns {import('~/modules/i18n/templates/i18n.types').InjectionFunction}
 */
export function createInjector(target) {
  return (property, value) => {
    /** @type {PropertyDescriptor} */
    const descriptor = { configurable: true }

    switch (property) {
      case 'fmt': {
        descriptor.get = /** @type {() => IntlFormatAliases} */ (value)
        break
      }
      case 'i18n': {
        descriptor.value = /** @type {IntlController} */ (value)
        break
      }
      case 't': {
        descriptor.value =
          /** @type {import('~/modules/i18n/templates/i18n.types').TranslateFunction} */ (
            value
          )
        break
      }
    }

    Object.defineProperty(target, `$${property}`, descriptor)
  }
}

/**
 * @private
 * @typedef {| string
 *   | import('vue').VNode
 *   | import('intl-messageformat').FormatXMLElementFn<import('vue').VNode>
 *   | null} Value
 */

function createIntlPluginBase() {
  /** @type {InstanceType<typeof IntlController> | null} */
  let controllerInstance = null

  return {
    /** @returns Existing controller or just initialized one. */
    getOrCreateController() {
      if (controllerInstance == null) {
        controllerInstance = new IntlController()
      }
      return controllerInstance
    },
    /**
     * Calls the callback to inject all of the helpers. The function will be
     * called for every property: `i18n` with {@link IntlController}, `t` with
     * {@link TranslateFunction}, `fmt` with function that returns actual
     * {@link IntlFormatAliases} of {@link IntlController}.
     *
     * @param {import('./i18n.types').InjectionFunction} inject Injection
     *   function.
     */
    inject(inject) {
      const controller = this.getOrCreateController()

      /** @type {import('./i18n.types').TranslateFunction} */
      function translate(descriptor, values, opts) {
        /** @type {ReturnType<IntlShape['formatMessage']>} */
        let result

        if (typeof descriptor === 'string') {
          result = controller.intl.formatMessage(
            { id: descriptor },
            /** @type {any} */ (values),
            opts
          )
        } else {
          result = controller.intl.formatMessage(
            descriptor,
            /** @type {any} */ (values),
            opts
          )
        }

        if (typeof result === 'string') {
          return result
        }

        if (Array.isArray(result)) {
          /** @type {string} */
          let normalizedResult = ''

          for (const item of /** @type {unknown[]} */ (result)) {
            normalizedResult += String(item)
          }

          return normalizedResult
        }

        return String(result)
      }

      function formats$getter() {
        return controller.formats
      }

      inject('i18n', controller)
      inject('t', translate)
      inject('fmt', formats$getter)
    },
  }
}

/**
 * @returns {import('vue').PluginObject<never> &
 *   ReturnType<typeof createIntlPluginBase>}
 */
export function createIntlPlugin() {
  const base = createIntlPluginBase()

  /** @type {import('vue').PluginObject<never>} */
  const vuePlugin = {
    install(vue) {
      const controller = this.getOrCreateController()

      this.inject(createInjector(vue.prototype))

      vue.component('IntlFormatted', createIntlFormattedComponent(controller))
    },
  }

  return Object.assign({}, base, vuePlugin)
}
