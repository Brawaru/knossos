<script>
// @ts-check
import { computed, defineComponent } from 'vue'
import ClearBadge from './ClearBadge.vue'
import ModrinthIcon from '~/assets/images/logo.svg?inline'
import ModeratorIcon from '~/assets/images/sidebar/admin.svg?inline'
import CreatorIcon from '~/assets/images/utils/box.svg?inline'
import { useTranslations } from '~/modules/i18n/runtime'

/**
 * @private
 * @typedef {'admin' | 'moderator' | 'creator'} UserRole
 */

/** A badge for user role */
export default defineComponent({
  name: 'UserRoleBadge',
  components: {
    ClearBadge,
    ModrinthIcon,
    ModeratorIcon,
    CreatorIcon,
  },
  props: {
    role: {
      type: /** @type {import('vue').PropType<UserRole>} */ (String),
      required: true,
    },
  },
  setup(props) {
    const translate = useTranslations()

    const text = computed(() =>
      translate(`user-role.${/** @type {UserRole} */ (props.role)}`)
    )

    return { text }
  },
})
</script>

<template>
  <ClearBadge color="orange">
    <template #default>{{ text }}</template>
    <template #icon>
      <ModrinthIcon v-if="role === 'admin'" />
      <ModeratorIcon v-else-if="role === 'moderator'" />
      <CreatorIcon v-else-if="role === 'creator'" />
    </template>
  </ClearBadge>
</template>
