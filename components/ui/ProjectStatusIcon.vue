<script>
// @ts-check
import { defineComponent } from 'vue'
import ListIcon from '~/assets/images/utils/list.svg?inline'
import EyeOffIcon from '~/assets/images/utils/eye-off.svg?inline'
import DraftIcon from '~/assets/images/utils/file-text.svg?inline'
import CrossIcon from '~/assets/images/utils/x.svg?inline'
import ArchiveIcon from '~/assets/images/utils/archive.svg?inline'
import ProcessingIcon from '~/assets/images/utils/updated.svg?inline'

export default defineComponent({
  components: {
    ListIcon,
    EyeOffIcon,
    DraftIcon,
    CrossIcon,
    ArchiveIcon,
    ProcessingIcon,
  },
  props: {
    /** Current project status. */
    status: {
      required: true,
      type: /**
       * @type {import('vue').PropType<
       *   | 'approved'
       *   | 'rejected'
       *   | 'draft'
       *   | 'unlisted'
       *   | 'archived'
       *   | 'processing'
       *   | 'unknown'
       * >}
       */ (String),
    },
  },
})
</script>

<template>
  <ListIcon v-if="status === 'approved'" />
  <CrossIcon v-else-if="status === 'rejected'" />
  <DraftIcon v-else-if="status === 'draft'" />
  <EyeOffIcon v-else-if="status === 'unlisted'" />
  <ArchiveIcon v-else-if="status === 'archived'" />
  <ProcessingIcon v-else-if="status === 'processing'" />
</template>
