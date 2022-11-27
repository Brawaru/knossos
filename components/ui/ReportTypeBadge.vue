<script>
// @ts-check
import { defineComponent } from 'vue'
import ClearBadge from './ClearBadge.vue'

/**
 * @private
 * @typedef {| 'spam'
 *   | 'copyright'
 *   | 'inappropriate'
 *   | 'malicious'
 *   | 'name-squatting'} ReportType
 */

/**
 * @private
 * @typedef {'project' | 'version' | 'user'} ItemType
 */

/**
 * A badge for report type, which selects appropriate 'reported for [reason]'
 * text and has orange colour.
 */
export default defineComponent({
  name: 'ReportTypeBadge',
  components: { ClearBadge },
  props: {
    type: {
      type: /** @type {import('vue').PropType<ReportType>} */ (String),
      required: true,
    },
    itemType: {
      type: /** @type {import('vue').PropType<ItemType>} */ (String),
      default: '',
    },
  },
})
</script>

<template>
  <ClearBadge color="orange">
    {{
      $t(`component.badge-report-type.text`, {
        itemType: itemType,
        reason: String(type).replace(/-/g, '_'),
        reasonText: $t(`report-type.${type}`),
      })
    }}
  </ClearBadge>
</template>
