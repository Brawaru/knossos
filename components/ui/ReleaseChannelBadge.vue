<script>
// @ts-check
import { computed, defineComponent } from 'vue'
import { useTranslations } from '~/modules/i18n/runtime'
import ClearBadge from './ClearBadge.vue'

/** @typedef {'release' | 'beta' | 'alpha'} VersionChannel */

export default defineComponent({
  name: 'ReleaseChannelBadge',
  components: { ClearBadge },
  props: {
    channel: {
      type: /** @type {import('vue').PropType<VersionChannel>} */ (String),
      required: true,
    },
    text: {
      type: /** @type {import('vue').PropType<string>} */ (String),
      required: false,
    },
  },
  setup(props) {
    const translate = useTranslations()

    const badgeColor = computed(
      /** @returns {import('./ClearBadge.vue').BadgeColor | undefined} */ () => {
        switch (props.channel) {
          case 'release':
            return 'green'
          case 'beta':
            return 'orange'
          case 'alpha':
            return 'red'
          default:
            return undefined
        }
      }
    )

    const text = computed(
      () =>
        props.text ??
        translate(
          /** @type {any} */ (`project-release-channel.${props.channel}`)
        )
    )

    return { badgeColor, text }
  },
})
</script>

<template>
  <ClearBadge :color="badgeColor">{{ text }}</ClearBadge>
</template>
