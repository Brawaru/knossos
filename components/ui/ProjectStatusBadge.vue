<script>
// @ts-check

import { defineComponent } from 'vue'
import ClearBadge from './ClearBadge.vue'
import ListIcon from '~/assets/images/utils/list.svg?inline'
import EyeOffIcon from '~/assets/images/utils/eye-off.svg?inline'
import DraftIcon from '~/assets/images/utils/file-text.svg?inline'
import CrossIcon from '~/assets/images/utils/x.svg?inline'
import ArchiveIcon from '~/assets/images/utils/archive.svg?inline'
import ProcessingIcon from '~/assets/images/utils/updated.svg?inline'

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
    ListIcon,
    EyeOffIcon,
    DraftIcon,
    CrossIcon,
    ArchiveIcon,
    ProcessingIcon,
  },
  props: /** @type {const} */ ({
    status: {
      type: /** @type {import('vue').PropType<Status>} */ (String),
      required: true,
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
})
</script>

<template>
  <ClearBadge :color="badgeColor">
    <template #default>
      <slot>{{ $t(`project-status.${status}`) }}</slot>
    </template>
    <template #icon>
      <ListIcon v-if="status === 'approved'" />
      <CrossIcon v-else-if="status === 'rejected'" />
      <DraftIcon v-else-if="status === 'draft'" />
      <EyeOffIcon v-else-if="status === 'unlisted'" />
      <ArchiveIcon v-else-if="status === 'archived'" />
      <ProcessingIcon v-else-if="status === 'processing'" />
    </template>
  </ClearBadge>
</template>
