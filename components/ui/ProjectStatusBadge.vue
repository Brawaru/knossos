<script>
// @ts-check

import { defineComponent } from 'vue'
import ClearBadge from './ClearBadge.vue'
import ProjectStatusIcon from './ProjectStatusIcon.vue'

/**
 * @typedef {| 'approved'
 *   | 'rejected'
 *   | 'draft'
 *   | 'unlisted'
 *   | 'archived'
 *   | 'processing'
 *   | 'unknown'} Status
 */

/** @typedef {import('vue').PropOptions<Status>} StatusPropOptions */

/**
 * A badge component that represents project status.
 *
 * The difference between regular badge component and this component is that it
 * will automatically select and provide icon to the badge component, as well as
 * text representing the status. The status is determined through the value of
 * the required `status` property.
 *
 * That text can be easily swapped using the default ('no name') slot or
 * property `text`. If both are passed, then slot takes the priority and `text`
 * property value is dismissed.
 */
export default defineComponent({
  components: {
    ClearBadge,
    ProjectStatusIcon,
  },
  props: /** @type {const} */ ({
    status: {
      type: /** @type {import('vue').PropType<Status>} */ (String),
      required: true,
    },
    text: {
      type: String,
    },
  }),
  computed: {
    /** @returns {import('./ClearBadge.vue').BadgeColor | undefined} */
    badgeColor() {
      switch (this.status) {
        case 'approved':
          return 'blue'
        case 'rejected':
          return 'red'
        case 'unlisted':
          return 'purple'
        case 'processing':
          return 'orange'
        default:
          return undefined
      }
    },
  },
  methods: {
    /** @returns {string} */
    defaultDisplayText() {
      // I hate typescript and javascript to be honest
      return (
        this.text ??
        this.$t(/** @type {any} */ (`project-status.${this.status}`))
      )
    },
  },
})
</script>

<template>
  <ClearBadge :color="badgeColor">
    <template>
      <slot>{{ defaultDisplayText() }}</slot>
    </template>
    <template #icon><ProjectStatusIcon :status="status" /></template>
  </ClearBadge>
</template>
