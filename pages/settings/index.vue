<template>
  <div>
    <section class="universal-card">
      <h2>
        {{ $t('settings.display.themes.title') }}
      </h2>
      <div class="adjacent-input">
        <label for="theme-selector">
          <span class="label__title">
            {{ $t('settings.display.themes.color-theme.title') }}
          </span>
          <span class="label__description">
            {{ $t('settings.display.themes.color-theme.title') }}
          </span>
        </label>
        <Multiselect
          id="theme-selector"
          v-model="$colorMode.preference"
          :options="['system', 'light', 'dark', 'oled']"
          :custom-label="
            (theme) => $t(`settings.display.themes.color-theme.value.${theme}`)
          "
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
          :allow-empty="false"
        />
      </div>

      <div class="adjacent-input small">
        <label for="search-layout-toggle">
          <span class="label__title">
            {{ $t('settings.display.themes.flip-search-sidebar.title') }}
          </span>
          <span class="label__description">
            {{ $t('settings.display.themes.flip-search-sidebar.title') }}
          </span>
        </label>
        <input
          id="search-layout-toggle"
          v-model="searchLayout"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmeticSettings"
        />
      </div>
      <div class="adjacent-input small">
        <label for="project-layout-toggle">
          <span class="label__title">
            {{ $t('settings.display.themes.flip-project-sidebar.title') }}
          </span>
          <span class="label__description">
            {{ $t('settings.display.themes.flip-project-sidebar.title') }}
          </span>
        </label>
        <input
          id="project-layout-toggle"
          v-model="projectLayout"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmeticSettings"
        />
      </div>
    </section>
    <section class="universal-card">
      <h2>
        {{ $t('settings.display.feature-flags.title') }}
      </h2>
      <div class="adjacent-input small">
        <label for="advanced-rendering">
          <span class="label__title">
            {{ $t('settings.display.feature-flags.hwa-effects.title') }}
          </span>
          <span class="label__description">
            {{ $t('settings.display.feature-flags.hwa-effects.description') }}
          </span>
        </label>
        <input
          id="advanced-rendering"
          v-model="advancedRendering"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmeticSettings"
        />
      </div>
      <div class="adjacent-input small">
        <label for="modpacks-alpha-notice">
          <span class="label__title">
            {{ $t('settings.display.feature-flags.modpack-notice.title') }}
          </span>
          <span class="label__description">
            {{
              $t('settings.display.feature-flags.modpack-notice.description')
            }}
          </span>
        </label>
        <input
          id="modpacks-alpha-notice"
          v-model="modpacksAlphaNotice"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmeticSettings"
        />
      </div>
      <div class="adjacent-input small">
        <label for="external-links-new-tab">
          <span class="label__title">
            {{ $t('settings.display.feature-flags.external-links.title') }}
          </span>
          <span class="label__description">
            {{
              $t('settings.display.feature-flags.external-links.description')
            }}
          </span>
        </label>
        <input
          id="external-links-new-tab"
          v-model="externalLinksNewTab"
          class="switch stylized-toggle"
          type="checkbox"
          @change="saveCosmeticSettings"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
  auth: false,
  data() {
    return {
      searchLayout: false,
      projectLayout: false,
      modpacksAlphaNotice: true,
      advancedRendering: true,
      externalLinksNewTab: true,
    }
  },
  fetch() {
    this.searchLayout =
      this.$store.state.cosmetics.searchLayout ?? this.searchLayout
    this.projectLayout =
      this.$store.state.cosmetics.projectLayout ?? this.projectLayout
    this.modpacksAlphaNotice =
      this.$store.state.cosmetics.modpacksAlphaNotice ??
      this.modpacksAlphaNotice
    this.advancedRendering =
      this.$store.state.cosmetics.advancedRendering ?? this.advancedRendering
    this.externalLinksNewTab =
      this.$store.state.cosmetics.externalLinksNewTab ??
      this.externalLinksNewTab
  },
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('settings.display.title'),
      }),
    }
  },
  methods: {
    async saveCosmeticSettings() {
      await this.$store.dispatch('cosmetics/save', {
        searchLayout: this.searchLayout,
        projectLayout: this.projectLayout,
        modpacksAlphaNotice: this.modpacksAlphaNotice,
        advancedRendering: this.advancedRendering,
        externalLinksNewTab: this.externalLinksNewTab,
        $cookies: this.$cookies,
      })
    },
    changeTheme() {
      const shift = event.shiftKey
      switch (this.$colorMode.preference) {
        case 'dark':
          this.$colorMode.preference = shift ? 'light' : 'oled'
          break
        case 'oled':
          this.$colorMode.preference = shift ? 'dark' : 'light'
          break
        default:
          this.$colorMode.preference = shift ? 'oled' : 'dark'
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
