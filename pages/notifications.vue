<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>{{ $t('notifications.title') }}</h1>
        <NavStack>
          <NavStackItem link="" label="All"> </NavStackItem>
          <NavStackItem
            v-for="type /* */ in notificationTypes"
            :key="type"
            :link="'?type=' + type"
            :label="$t(`notifications.filter.${type}`)"
          >
          </NavStackItem>
        </NavStack>
        <h3>{{ $t('notifications.manage.title') }}</h3>
        <div class="input-group">
          <NuxtLink class="iconified-button" to="/settings/follows">
            <SettingsIcon />
            {{ $t('settings.follows.title.short') }}
          </NuxtLink>
          <button
            v-if="$user.notifications.length > 0"
            class="iconified-button danger-button"
            @click="clearNotifications"
          >
            <ClearIcon />
            {{ $t('notifications.action.clear-all') }}
          </button>
        </div>
      </aside>
    </div>
    <div class="normal-page__content">
      <div class="notifications">
        <div
          v-for="notification in $route.query.type !== undefined
            ? $user.notifications.filter((x) => x.type === $route.query.type)
            : $user.notifications"
          :key="notification.id"
          class="universal-card adjacent-input"
        >
          <div class="label">
            <span class="label__title">
              <nuxt-link :to="notification.link">
                <h3 v-html="$xss($md.render(notification.title))" />
              </nuxt-link>
            </span>
            <div class="label__description">
              <p>{{ notification.text }}</p>
              <span
                v-tooltip="
                  $fmt.date(new Date(notification.created), {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })
                "
                class="date"
              >
                <CalendarIcon />
                {{
                  $t('notifications.notification.received', {
                    ago: $fmt.timeDifference(notification.created),
                  })
                }}
              </span>
            </div>
          </div>
          <div class="input-group">
            <button
              v-for="(action, actionIndex) in notification.actions"
              :key="actionIndex"
              class="iconified-button"
              :class="`action-button-${action.title
                .toLowerCase()
                .replaceAll(' ', '-')}`"
              @click="
                performAction(notification, notificationIndex, actionIndex)
              "
            >
              {{ getActionTranslation(action) }}
            </button>
            <button
              v-if="notification.actions.length === 0"
              class="iconified-button"
              @click="performAction(notification, notificationIndex, null)"
            >
              {{ $t('notifications.notification.action.dismiss') }}
            </button>
          </div>
        </div>
        <div v-if="$user.notifications.length === 0" class="error">
          <UpToDate class="icon"></UpToDate>
          <br />
          <span class="text">
            {{ $t('generic.filler.up-to-date') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClearIcon from '~/assets/images/utils/clear.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'
import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import UpToDate from '~/assets/images/illustrations/up_to_date.svg?inline'
import NavStack from '~/components/ui/NavStack'
import NavStackItem from '~/components/ui/NavStackItem'

const NOTIFICATION_TYPES = {
  team_invite: 'Team invites',
  project_update: 'Project updates',
}

export default {
  name: 'Notifications',
  components: {
    NavStack,
    NavStackItem,
    ClearIcon,
    SettingsIcon,
    CalendarIcon,
    UpToDate,
  },
  async fetch() {
    this.NOTIFICATION_TYPES = NOTIFICATION_TYPES

    await this.$store.dispatch('user/fetchNotifications')
  },
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('notifications.title'),
      }),
    }
  },
  computed: {
    notificationTypes() {
      const obj = {}

      for (const notification of this.$user.notifications.filter(
        (it) => it.type !== null
      )) {
        obj[notification.type] = true
      }

      return Object.keys(obj)
    },
  },
  methods: {
    async clearNotifications() {
      try {
        const ids = this.$user.notifications.map((x) => x.id)

        await this.$axios.delete(
          `notifications?ids=${JSON.stringify(ids)}`,
          this.$defaultHeaders()
        )

        ids.forEach((x) => this.$store.dispatch('user/deleteNotification', x))
      } catch (err) {
        this.$notify({
          group: 'main',
          title: this.$t('generic.error.title'),
          text: err.response.data.description,
          type: 'error',
        })
      }
    },
    async performAction(notification, notificationIndex, actionIndex) {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.delete(
          `notification/${notification.id}`,
          this.$defaultHeaders()
        )

        await this.$store.dispatch('user/deleteNotification', notification.id)

        if (actionIndex !== null) {
          const config = {
            method:
              notification.actions[actionIndex].action_route[0].toLowerCase(),
            url: `${notification.actions[actionIndex].action_route[1]}`,
            headers: {
              Authorization: this.$auth.token,
            },
          }
          await this.$axios(config)
        }
      } catch (err) {
        this.$notify({
          group: 'main',
          title: 'An error occurred',
          text: err.response.data.description,
          type: 'error',
        })
      }
      this.$nuxt.$loading.finish()
    },
    /**
     * Tries to match the action title with existing notification action, and if
     * successful, returns translation, otherwise returns the original title.
     *
     * @param {{ title: string }} action Action.
     * @returns Translation for the action title or the original title.
     */
    getActionTranslation(action) {
      const normalizedId = action.title
        .replace(/[^a-z]/gi, (match) => (match === ' ' ? '-' : ''))
        .toLowerCase()

      const translationId = `notifications.notification.action.${normalizedId}`

      if (translationId in this.$i18n.intl.messages) {
        return this.$t(translationId)
      }

      return action.title
    },
  },
}
</script>

<style lang="scss" scoped>
.notifications {
  .label {
    .label__title {
      display: flex;
      gap: var(--spacing-card-sm);
      align-items: baseline;
      margin-block-start: 0;

      h3 ::v-deep {
        margin: 0;
        p {
          margin: 0;
        }
      }
    }

    .label__description {
      margin: 0;

      .date {
        display: flex;
        align-items: center;
        gap: var(--spacing-card-xs);
        color: var(--color-heading);
        font-weight: 500;
        font-size: 1rem;
        width: fit-content;
      }

      p {
        margin-block: 0 var(--spacing-card-md);
      }
    }
  }
}
</style>
