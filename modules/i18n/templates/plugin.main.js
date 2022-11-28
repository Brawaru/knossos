// @ts-check

import Vue, { computed, reactive } from 'vue'
import { createInjector, createIntlPlugin } from './i18n'
import { hasOwn, parseAcceptLanguageHeader } from './utils'
import { localesDefinitions, defaultLocale } from './options'
import { match as matchLocale } from '@formatjs/intl-localematcher'

/** @type {import('cookie-universal-nuxt').SetParams['opts']} */
const cookieDefaults = {
  // Nicely copied from cosmetics.js :P
  maxAge: 60 * 60 * 24 * 365 * 10,
  sameSite: 'strict',
  secure: true,
  httpOnly: false,
  path: '/',
}

/**
 * @param {string} locale Locale which messages need to be loaded and returned.
 * @returns {Promise<import('./options').LocaleImport>} Locale messages.
 * @throws If locale is not found in the import map or import fails.
 */
async function loadLocaleMessages(locale) {
  if (!hasOwn(localesDefinitions, locale)) {
    throw new Error(`Locale "${locale}" is not present in the definitions map`)
  }

  return localesDefinitions[locale].importFunction()
}

/**
 * @param {string[]} requestedLocales
 * @param {string[]} availableLocales
 * @param {string} defaultLocale
 * @param {import('@formatjs/intl-localematcher').Opts} [opts]
 * @returns {string}
 * @see {@link matchLocale} For the method details.
 */
function safeMatchLocale(
  requestedLocales,
  availableLocales,
  defaultLocale,
  opts
) {
  try {
    return matchLocale(requestedLocales, availableLocales, defaultLocale, opts)
  } catch (err) {
    return defaultLocale
  }
}

/** @typedef {Partial<import('./types').LocaleImportedData>} PartialImportData */

/** @type {import('@nuxt/types').Plugin} */
export default async function (context) {
  const { app } = context

  const defaultLocaleImport = await loadLocaleMessages(defaultLocale)

  const settings = reactive({
    /** An array of all available locales. */
    availableLocales: Object.entries(localesDefinitions).map(
      ([code, definition]) => ({
        code,
        data: definition.data,
      })
    ),
    /** Whether the current locale is driven by the browser's preferences. */
    isAuto: false,
    /**
     * Import data for the current locale.
     *
     * @type {PartialImportData}
     */
    importData: Object.create(null),
    /** Current locale preferred by the browser. */
    browserLocale: defaultLocale,
  })

  const mergedImportData = computed(
    /** @returns {import('./types').LocaleImportedData} */ () => {
      const data = Object.create(null)
      Object.assign(data, defaultLocaleImport.importedData)

      for (const [key, value] of Object.entries(settings.importData)) {
        if (value == null) continue

        data[key] = value
      }

      return data
    }
  )

  /**
   * Retrieves preferred locale from the cookies.
   *
   * @returns {string | null} Locale that was previously saved or `null` if none
   *   is saved.
   */
  function getLocaleCookie() {
    let value = app.$cookies.get('locale') ?? null
    if (value === '') value = null
    return value
  }

  /**
   * Retrieves preferred locale from the cookies.
   *
   * @param {string | null} locale Locale code to set or `null` if it needs to
   *   be removed.
   */
  function setLocaleCookie(locale) {
    if (locale == null) {
      app.$cookies.remove('locale', cookieDefaults)
    } else {
      app.$cookies.set('locale', locale, cookieDefaults)
    }
  }

  /**
   * Retries preferred locale from the localStorage.
   *
   * @returns {string | null} Locale saved in localStorage or `null` if value is
   *   missing or the function is called from the server context.
   */
  function getLocaleFromLocalStorage() {
    return process.client ? localStorage.getItem('locale') ?? null : null
  }

  /**
   * Saves preferred locale to the localStorage for later retrieval.
   *
   * @param {string | null} locale Locale code to save or `null` if it needs to
   *   be removed.
   */
  function saveLocaleToLocalStorage(locale) {
    if (process.client) {
      try {
        if (locale == null) {
          localStorage.removeItem('locale')
        } else {
          localStorage.setItem('locale', locale)
        }
      } catch (err) {
        console.error('Failed to save locale to the localStorage', err)
      }
    }
  }

  /**
   * Retreives list of locales that navigator (browser) prefers, either through
   * `Accept-Language` header (on the server side) or via `navigator.language`
   * API (on client, and only if present).
   *
   * @returns {string[]} Array of prefered languages by the navigator, can be
   *   empty.
   */
  function getNavigatorLocales() {
    if (process.server) {
      const locales = context.req.headers['accept-language']

      if (locales != null) {
        return parseAcceptLanguageHeader(locales).map((it) => it[0])
      }

      return []
    } else {
      if ('languages' in navigator) {
        return [...navigator.languages]
      } else if ('language' in navigator) {
        return [navigator.language]
      }

      return []
    }
  }

  /** @typedef {'default' | 'override' | 'storage' | 'navigator'} DetectionSource */

  /**
   * @private
   * @typedef {object} DetectedLocale
   * @property {string} locale Detected preferred locale.
   * @property {DetectionSource} source Source where locale comes from.
   */

  /**
   * Detects locale to use in app.
   *
   * @param {boolean} [restore=true] Whether the locale can be restored from the
   *   means of storage (cookies, localStorage). Default is `true`
   * @returns {DetectedLocale} Detected locale to use.
   */
  function detectLocale(restore = true) {
    const availableLocaleCodes = settings.availableLocales.map((it) => it.code)

    /** @type {null | string | (string | null)[]} */
    let hostLanguage = context.query?.hl ?? null

    if (Array.isArray(hostLanguage)) {
      if (hostLanguage.length < 1) {
        hostLanguage = null
      } else {
        hostLanguage = [hostLanguage[0]] ?? null
      }
    }

    if (hostLanguage === '') {
      hostLanguage = null
    }

    if (hostLanguage != null) {
      return {
        locale: safeMatchLocale(
          [/** @type {string} */ (hostLanguage)],
          availableLocaleCodes,
          defaultLocale
        ),
        source: 'override',
      }
    }

    if (restore) {
      /** @type {string | null} */
      let restored = null

      restored = getLocaleCookie()

      if (restored == null) {
        restored = getLocaleFromLocalStorage()
      }

      if (restored != null) {
        const availableRestoredLocale = safeMatchLocale(
          [restored],
          availableLocaleCodes,
          'en-x-placeholder'
        )

        if (availableRestoredLocale !== 'en-x-placeholder') {
          return {
            locale: availableRestoredLocale,
            source: 'storage',
          }
        }
      }
    }

    const navigatorLocale = safeMatchLocale(
      getNavigatorLocales(),
      availableLocaleCodes,
      'en-x-placeholder'
    )

    if (navigatorLocale === 'en-x-placeholder') {
      return {
        locale: defaultLocale,
        source: 'navigator',
      }
    } else {
      return {
        locale: navigatorLocale,
        source: 'navigator',
      }
    }
  }

  /**
   * @param {string} locale BCP47 locale code of new locale or `'auto'` to use
   *   browser locale.
   * @param {boolean} save Whether to save the locale to all means of storage
   *   (cookies, localStorage) to restore on the next reload.
   * @this {InstanceType<typeof import('./i18n').IntlController>}
   */
  async function changeLocale(locale, save = true) {
    let normalizedLocale = locale // we don't want to mutate args and also want yeet locale from saves

    // Special case.
    if (normalizedLocale === 'auto') {
      const { locale: detectedLocale } = detectLocale(false)
      normalizedLocale = detectedLocale
    }

    const localeImport = await loadLocaleMessages(normalizedLocale)

    this.initWith(normalizedLocale, localeImport.messages)

    settings.importData = localeImport.importedData

    const isAuto = locale === 'auto'
    settings.isAuto = isAuto

    if (save) {
      setLocaleCookie(isAuto ? null : locale)
      saveLocaleToLocalStorage(isAuto ? null : locale)
    }
  }

  /** @typedef {import('./i18n').IntlController} */

  /**
   * Extends Intl Controller to provide functionality of the Nuxt module.
   *
   * @param {InstanceType<typeof import('./i18n').IntlController>} controller
   *   Controller to extend.
   * @returns {import('./types').ExtendedIntlController} The same controller but
   *   with changed type.
   */
  function extendController(controller) {
    const boundChangeLocale = changeLocale.bind(controller)

    Object.defineProperties(controller, {
      availableLocales: {
        configurable: true,
        get() {
          return settings.availableLocales
        },
      },
      browserLocale: {
        configurable: true,
        get() {
          return settings.browserLocale
        },
      },
      changeLocale: {
        configurable: true,
        get() {
          return boundChangeLocale
        },
      },
      automatic: {
        configurable: true,
        get() {
          return settings.isAuto
        },
      },
      data: {
        configurable: true,
        get() {
          return mergedImportData.value
        },
      },
      defaultData: {
        configurable: true,
        get() {
          return defaultLocaleImport.importedData
        },
      },
    })

    return /** @type {import('./types').ExtendedIntlController} */ (controller)
  }

  const plugin = createIntlPlugin()

  const controller = extendController(plugin.getOrCreateController())

  Vue.use(plugin)

  plugin.inject(createInjector(context))
  plugin.inject(createInjector(app))

  if (app.store != null) {
    plugin.inject(createInjector(app.store))
  }

  if (process.client) {
    window.addEventListener('languagechange', () => {
      const { locale: detectedLocale } = detectLocale(false)
      settings.browserLocale = detectedLocale

      if (settings.isAuto) {
        controller.changeLocale('auto').then(
          () => {},
          (err) => {
            console.error(
              '[knossos-i18n] cannot change language to match browser settings.\n',
              err
            )
          }
        )
      }
    })
  }

  controller.addLocaleData(defaultLocale, defaultLocaleImport.messages)

  {
    const { locale: detectedLocale, source: detectionSource } = detectLocale()
    await controller.changeLocale(detectedLocale, false)

    const isAuto =
      detectionSource === 'navigator' || detectionSource === 'default'

    settings.isAuto = isAuto

    settings.browserLocale = detectLocale(false).locale

    if (context.isDev) {
      console.log('[knossos-i18n] setup completed', {
        detectedLocale,
        detectionSource,
        isAuto,
      })
    }
  }
}
