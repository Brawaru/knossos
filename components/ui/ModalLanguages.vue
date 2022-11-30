<template>
  <Modal
    ref="modalRef"
    :header="$t('component.modal-languages.title')"
    @close="close"
  >
    <template #default>
      <div
        :class="{ container: true, 'advanced-rendering': advancedRendering }"
      >
        <div class="contributions-notice">
          <IntlFormatted
            message-id="component.modal-languages.contribution-notice"
          >
            <template #crowdin-link="{ children }">
              <a href=""><Fragment :of="children" /></a>
            </template>
          </IntlFormatted>
        </div>
        <div class="languages-grid-container">
          <div v-if="automatic" class="automatic-overlay">
            <div class="automatic-overlay-icon">
              <GlobeIcon aria-hidden="true" />
            </div>
            <div class="automatic-overlay-content" tabindex="0">
              <h3 class="automatic-overlay-title">
                {{ $t('component.modal-languages.auto-lockout.title') }}
              </h3>
              <p class="automatic-overlay-description">
                <IntlFormatted
                  message-id="component.modal-languages.auto-lockout.description"
                  :values="{ language: currentLanguage.displayName }"
                />
              </p>
            </div>
            <div class="automatic-overlay-actions">
              <button
                class="iconified-button brand-button"
                @click="disableAutomaticMode"
              >
                {{ $t('component.modal-languages.auto-lockout.action') }}
              </button>
            </div>
          </div>
          <div
            class="languages-grid-wrap"
            :tabindex="automatic ? -1 : undefined"
            :class="{ 'blur-out': automatic }"
          >
            <input
              v-model="searchQuery"
              type="search"
              name="search"
              :placeholder="
                $t('component.modal-languages.field.search.placeholder')
              "
              :disabled="automatic"
              aria-describedby="slm-s-desc"
              @keypress="onSearchKeyPress"
            />
            <div id="slm-s-desc" class="sr-only">
              {{ $t('component.modal-languages.field.search.description') }}
            </div>
            <div id="slm-sr-results" class="sr-only" aria-live="polite">
              {{
                typedSearchQuery === ''
                  ? ''
                  : $t(
                      'component.modal-languages.announcement.search-results',
                      {
                        matches: matchingLanguages.length,
                      }
                    )
              }}
            </div>
            <div
              ref="gridRef"
              class="languages-grid"
              :class="{ empty }"
              :aria-label="$t('component.modal-languages.grid.legend')"
              role="list"
            >
              <div
                v-for="language in matchingLanguages"
                :key="language.code"
                :ref="
                  selectedLanguage === language.code
                    ? 'highlightedLanguageEl'
                    : undefined
                "
                class="language"
                :class="{ active: selectedLanguage === language.code }"
                role="listitem"
              >
                <input
                  :id="language.inputID"
                  :ref="language.inputID"
                  v-model="selectedLanguage"
                  type="radio"
                  name="language"
                  :value="language.code"
                  class="sr-only"
                  :disabled="automatic"
                />
                <div class="language-info">
                  <label :for="language.inputID" class="language-label">
                    <div
                      class="display-name"
                      :lang="language.code"
                      :aria-label="
                        $t('component.modal-languages.language.label', {
                          displayName: language.displayName,
                          translatedName: language.translatedName,
                        })
                      "
                    >
                      {{ language.displayName }}
                    </div>
                    <span
                      v-if="isBrowserLanguage(language)"
                      v-tooltip="
                        $t(
                          'component.modal-languages.language.browser-preferred'
                        )
                      "
                      class="browser-locale"
                    >
                      <GlobeIcon aria-hidden="true" />
                      <span class="sr-only">{{
                        $t(
                          'component.modal-languages.language.icon-labels.browser-preferred'
                        )
                      }}</span>
                    </span>
                    <span
                      v-if="isCurrentlyUsed(language)"
                      v-tooltip="
                        $t('component.modal-languages.language.currently-used')
                      "
                      class="current-locale"
                    >
                      <Check aria-hidden="true" />
                      <span class="sr-only">{{
                        $t(
                          'component.modal-languages.language.icon-labels.currently-used'
                        )
                      }}</span>
                    </span>
                  </label>
                  <div class="translated-name">
                    {{ language.translatedName }}
                  </div>
                </div>
              </div>
              <div
                v-if="!empty && matchingLanguages.length < 4"
                class="language spacer"
                aria-hidden="true"
              />
              <div
                v-if="!empty && matchingLanguages.length < 3"
                class="language spacer"
                aria-hidden="true"
              />
              <div
                v-if="!empty && matchingLanguages.length < 2"
                class="language spacer"
                aria-hidden="true"
              />
              <div
                v-if="empty"
                class="placeholder"
                tabindex="0"
                role="listitem"
              >
                {{ $t('component.modal-languages.filler.no-results') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="action-tray">
        <div class="left">
          <button
            class="iconified-button"
            :disabled="automatic"
            @click="enableAutomatic"
          >
            {{ $t('component.modal-languages.action.enable-automatic') }}
          </button>
        </div>
        <div class="right">
          <button
            type="button"
            class="iconified-button brand-button"
            :disabled="!canBeSaved"
            @click="applyChanges"
          >
            {{ $t('generic.action.save') }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
// @ts-check
import { defineComponent, ref, nextTick } from 'vue'
import Fuse from 'fuse.js/dist/fuse.basic'
import Modal from './Modal.vue'
import GlobeIcon from '~/assets/images/utils/globe.svg?inline'
import Check from '~/assets/images/utils/check.svg?inline'

const englishDisplayNames = new Intl.DisplayNames('en', { type: 'language' })

/**
 * @typedef {object} LanguageProps
 * @property {string} inputID Unique identifier for the input element to link it
 *   and its label together.
 * @property {string} displayName Language displayed in that language.
 * @property {string} translatedName Language name translated to the current
 *   language.
 * @property {string} englishName Language name in English.
 */

/**
 * @typedef {import('~/modules/i18n/templates/types').LocaleDescriptor &
 *   LanguageProps} Language
 */

/** @typedef {Language[]} LanguagesIndex */

/** @this {Vue} */
function initialState() {
  return {
    /** Currently selected locale. */
    manuallySelectedLanguage: this.$i18n.locale,
    /** Holds value for the current search query. */
    typedSearchQuery: '',
  }
}

export default defineComponent({
  name: 'ModalLanguages',
  components: {
    Modal,
    GlobeIcon,
    Check,
  },
  setup() {
    const modalRef = ref(
      /** @type {null | InstanceType<import('./Modal.vue').default>} */ (null)
    )

    const gridRef = ref(/** @type {null | HTMLFieldSetElement} */ (null))

    return { modalRef, gridRef }
  },
  data() {
    return initialState.call(this)
  },
  computed: {
    /**
     * @returns {boolean} Whether the modal is showing based on the global
     *   state.
     */
    isShowing() {
      return this.$store.getters['i18n/isLanguageModalShowing']
    },
    /** @returns {boolean} Whether the advanced rendering is enabled. */
    advancedRendering() {
      return this.$store.getters['cosmetics/advancedRendering']
    },
    /** @returns {boolean} */
    automatic() {
      return this.$i18n.automatic
    },
    /** Current search query or empty string (`''`) if automatic mode is enabled. */
    searchQuery: {
      /**
       * @returns {string} Current search query or `''` if automatic mode is
       *   enabled.
       */
      get() {
        if (this.automatic) {
          return ''
        }

        return this.typedSearchQuery
      },
      /** @param {string} value New search query. */
      set(value) {
        this.typedSearchQuery = value
      },
    },
    selectedLanguage: {
      /** @returns {string} Either automatic locale or selected locale. */
      get() {
        return this.automatic
          ? this.$i18n.locale
          : this.manuallySelectedLanguage
      },
      /** @param {string} value New locale. */
      set(value) {
        this.manuallySelectedLanguage = value
      },
    },
    /** @returns {LanguagesIndex} */
    languages() {
      return this.$i18n.availableLocales.map((locale) => {
        const { baseName: safeLocaleCode } = new Intl.Locale(locale.code)

        /** @type {string | undefined} */
        let displayName = locale.data?.displayName

        if (displayName == null) {
          try {
            displayName = new Intl.DisplayNames(safeLocaleCode, {
              type: 'language',
            }).of(safeLocaleCode)
          } catch (err) {
            console.warn(
              `Cannot retrieve display name for locale "${locale.code}"`,
              err
            )
          }
        }

        if (displayName == null) {
          // You gotta display something, ey?
          displayName = locale.code
        }

        /** @type {string | undefined} */
        let translatedName

        if (locale.code in this.$i18n.data['languages.json']) {
          translatedName = /** @type {any} */ (
            this.$i18n.data['languages.json']
          )[locale.code]
        }

        if (translatedName == null) {
          try {
            translatedName = this.$fmt.displayName(safeLocaleCode, {
              type: 'language',
              style: 'short',
            })
          } catch (err) {
            console.warn(
              `Cannot retrieve translated name for locale "${locale.code}"`,
              err
            )
          }
        }

        if (translatedName == null) {
          translatedName = locale.code
        }

        let englishName = /** @type {any} */ (
          this.$i18n.defaultData['languages.json']
        )[locale.code]

        if (englishName == null) {
          try {
            englishName = englishDisplayNames.of(safeLocaleCode)
          } catch (err) {
            console.warn(
              `Cannot retrieve English name for locale "${locale.code}"`,
              err
            )
          }
        }

        if (englishName == null) {
          englishName = locale.code
        }

        return /** @type {Language} */ ({
          ...locale,
          inputID: `language-${locale.code}`,
          displayName,
          translatedName,
          englishName,
        })
      })
    },
    /**
     * Fuse search instance.
     *
     * @returns {import('fuse.js').default<LanguagesIndex[0]>}
     */
    fuse() {
      return new Fuse(this.languages, {
        keys: ['code', 'displayName', 'translatedName', 'englishName'],
        threshold: 0.4,
        distance: 100,
      })
    },
    /**
     * All languages that match the search query sorted by relevance. If search
     * query is empty, then this returns all available languages sorted by their
     * display names instead.
     *
     * @returns {LanguagesIndex}
     */
    matchingLanguages() {
      if (this.searchQuery.trim() === '') {
        return [...this.languages].sort((a, b) =>
          a.displayName.localeCompare(b.displayName)
        )
      }

      return this.fuse.search(this.searchQuery).map((_) => _.item)
    },
    /** @returns {boolean} Whether there are no search results. */
    empty() {
      return this.matchingLanguages.length === 0
    },
    /** @returns {Language} */
    currentLanguage() {
      // voiding the typescript check since we (probably) can be sure that the language will be found
      return /** @type {Language} */ (
        this.languages.find((language) => language.code === this.$i18n.locale)
      )
    },
    /**
     * @returns {boolean} Whether there are any changes that can be saved, will
     *   also return `false` if automatic mode is enabled.
     */
    canBeSaved() {
      return !this.automatic && this.$i18n.locale !== this.selectedLanguage
    },
  },
  watch: {
    isShowing(isShowing, wasShowing) {
      if (this.modalRef == null) {
        return
      }

      if (isShowing) {
        this.modalRef.show()
      } else {
        this.modalRef.hide()
      }

      if (isShowing && !wasShowing) {
        this.reset()

        nextTick(() => {
          const el = /** @type {HTMLDivElement[]} */ (
            this.$refs.highlightedLanguageEl
          )[0]

          if (el != null) {
            el.scrollIntoView({
              behavior: 'auto',
              block: 'center',
            })
          }
        })
      }
    },
  },
  methods: {
    /** @param {KeyboardEvent} e Keyboard event */
    onSearchKeyPress(e) {
      const anyModifierPressed =
        e.altKey || e.ctrlKey || e.metaKey || e.shiftKey

      if (e.key === 'Enter' && !anyModifierPressed) {
        const focusable =
          /** @type {HTMLInputElement | HTMLDivElement | undefined} */ (
            this.gridRef?.querySelector('input,div.placeholder')
          )

        focusable?.focus({ preventScroll: true })
      }
    },
    async applyChanges() {
      await this.$i18n.changeLocale(this.selectedLanguage)
    },
    /**
     * @param {Language} language Language to check.
     * @returns {boolean} Whether the locale is browser preferred locale.
     */
    isBrowserLanguage(language) {
      return language.code === this.$i18n.browserLocale
    },
    /**
     * @param {Language} language Language to check.
     * @returns {boolean} Whether the language is currently used.
     */
    isCurrentlyUsed(language) {
      return language.code === this.$i18n.locale
    },
    /**
     * Checks whether the language has a special classes on its row and if so,
     * returns it.
     *
     * @param {Language} language Language to check for special classes.
     * @returns {Record<string, boolean> | undefined} Special classes to use.
     */
    specialLanguageClasses(language) {
      switch (language.code) {
        case 'en-x-updown':
          return { 'upside-down': true }
        case 'en-x-uwu':
          return { uwuify: true }
        default:
          return undefined
      }
    },
    /** Closes the modal by dispatching an action on the global state. */
    close() {
      this.$store.dispatch('i18n/toggleLanguageModal', false)
    },
    /** Turns on automatic mode. */
    enableAutomatic() {
      return this.$i18n.changeLocale('auto')
    },
    /** Turns off automatic mode. */
    disableAutomaticMode() {
      return this.$i18n.changeLocale(this.$i18n.locale)
    },
    /** Resets everything to default state. */
    reset() {
      Object.assign(this.$data, initialState.call(this))
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.contributions-notice {
  padding: var(--spacing-card-bg);
  background: var(--color-inline-info-bg);
  color: var(--color-inline-info-text);
  box-shadow: var(--shadow-raised), var(--shadow-inset);
  border-radius: var(--size-rounded-card);
  margin: var(--spacing-card-md);
  margin-top: var(--spacing-card-sm);

  a {
    color: var(--color-inline-info-link);

    &:hover {
      text-decoration: underline;
    }
  }
}

.languages-grid-container {
  position: relative; // for overlay

  border-radius: 5px;
  overflow: hidden;
  padding: var(--spacing-card-md);
  padding-bottom: 0;

  input[type='search'] {
    width: 100%;
    margin: unset;
    margin-top: -5px;
    margin-bottom: 10px;
  }
}

.automatic-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: var(--color-overlay-bg);

  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 4.9px; // precision because we're duplicating the rounding

  row-gap: 15px;

  padding: 10px; // some space when very limited by space

  &:first-child {
    margin-top: -1rem;
  }

  &-icon {
    display: flex;
    font-size: 5rem;
  }

  &-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-heading);
  }

  &-icon,
  &-title {
    color: var(--color-overlay-title);
  }

  &-title,
  &-description {
    text-align: center;
  }

  &-description {
    white-space: pre-line;
    max-width: 400px;
    color: var(--color-overlay-description);
    margin: 0;
  }
}

.languages-grid-wrap {
  .advanced-rendering &.blur-out {
    filter: blur(2px);
  }
}

.languages-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;

  @media (max-width: 585px) {
    justify-content: stretch;
  }

  height: 300px;

  max-width: 645px;

  gap: 5px;

  overflow-y: auto;

  overscroll-behavior: none;

  scrollbar-gutter: stable;

  margin-bottom: 1px; // don't you love CSS?

  &.empty {
    scrollbar-gutter: auto;
    justify-content: center;
    align-content: center;
  }

  .language {
    display: flex;

    min-width: 180px;
    width: 180px;

    @media (max-width: 585px) {
      width: 100%;
    }

    background: var(--color-grid-item-bg);

    padding: 10px;

    position: relative;

    border: 2px solid transparent;
    border-radius: var(--size-rounded-control);

    transition: filter 0.2s ease-in-out, transform 0.05s ease-out,
      outline 0.2s ease-in-out;

    isolation: isolate; // avoid z-index mess

    &:active {
      transform: scale(0.96);
      filter: brightness(0.9);
    }

    &.active {
      background: var(--color-grid-item-active-bg);
      border-color: var(--color-grid-item-active-outline);

      .language-label {
        color: var(--color-grid-item-active-text);
      }

      .translated-name {
        color: var(--color-grid-item-active-text-secondary);
      }
    }

    .language-info {
      overflow: hidden;

      label {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        column-gap: 5px;
        align-items: center;

        color: var(--color-text);

        &[for='language-en-x-updown'] {
          div.display-name {
            transform: rotate(180deg);
          }
        }

        div {
          flex: unset;
        }

        span {
          // unset any nonsense by global styles
          flex: unset;
          padding-right: unset;
          display: flex;
        }

        span.browser-locale {
          z-index: 1;
          justify-self: flex-start;
        }

        span.current-locale {
          z-index: 1;
        }
      }

      .display-name {
        font-weight: bold;
      }

      .translated-name {
        font-size: var(--font-size-sm);
        color: var(--color-grid-item-text-secondary);
      }

      .display-name,
      .translated-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .spacer {
    visibility: hidden;
  }

  .placeholder {
    text-align: center;
    width: 100vw; // set to something absurd so it stretches the whole grid
  }
}

.language-label {
  cursor: pointer;

  &::after {
    content: '';
    // pseudo can be of any size so we just need to attach it to all sides
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.action-tray {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-card-md);
}
</style>
