<template>
  <div
    ref="bodyHtmlRef"
    v-highlightjs
    class="markdown-body card"
    v-html="$xss($md.render(project.body))"
  ></div>
</template>

<script>
import { ref } from 'vue'
import { match as localeMatch } from '@formatjs/intl-localematcher'

export default {
  auth: false,
  props: {
    project: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup() {
    /** @type {HTMLDivElement | null} */
    const bodyHtmlRef = ref(null)

    return { bodyHtmlRef }
  },
  watch: {
    '$i18n.locale'() {
      this.openCloseLanguageSpoilers()
    },
  },
  mounted() {
    this.openCloseLanguageSpoilers()
  },
  methods: {
    openCloseLanguageSpoilers() {
      if (this.bodyHtmlRef == null) {
        return
      }

      /** @type {HTMLDetailsElement[]} */
      const spoilers = Array.from(
        this.bodyHtmlRef.querySelectorAll('details[lang]')
      )

      const availableLocales = spoilers
        .map((spoiler) => spoiler.lang)
        .filter((locale) => locale != null && locale !== '')

      /** @type {string} */
      let matchingLocale

      try {
        matchingLocale = localeMatch(
          [this.$i18n.locale],
          availableLocales,
          this.$i18n.defaultLocale
        )
      } catch (err) {
        console.warn('Failed to match locale against existing locales', {
          availableLocales,
          err,
        })
        matchingLocale = this.$i18n.defaultLocale
      }

      for (const spoiler of spoilers) {
        spoiler.open = spoiler.lang === matchingLocale
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.markdown-body {
  max-width: calc(
    60rem - 2 * var(--spacing-card-lg) - 9px
  ); // $2.50 to anyone who can figure out why the 9px is needed
}
</style>
