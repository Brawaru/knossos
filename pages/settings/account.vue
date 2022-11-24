<template>
  <div>
    <ModalConfirm
      ref="modal_confirm"
      :title="$t('settings.modal-delete-account.title')"
      :proceed-label="$t('settings.modal-delete-account.action')"
      :confirmation-text="$auth.user.username"
      :has-to-type="true"
      @proceed="deleteAccount"
    >
      <IntlFormatted
        message-id="settings.modal-delete-account.description"
        :tags="['strong']"
      >
        <template #discord-link="{ children }">
          <a href="https://discord.gg/EUHuJHt" :target="$external()">
            <Fragment :of="children" />
          </a>
        </template>
      </IntlFormatted>
    </ModalConfirm>

    <Modal
      ref="modal_revoke_token"
      :header="$t('settings.modal-revoke-token.title')"
    >
      <div class="modal-revoke-token markdown-body">
        <div class="button-group">
          <IntlFormatted
            :message="$i18n.data['revoke-token.html']"
            :tags="['p', 'ul', 'li', 'strong']"
          >
            <template #revoke-link="{ children }">
              <a
                href="https://github.com/settings/connections/applications/3acffb2e808d16d4b226"
                target="_blank"
              >
                <Fragment :of="children" />
              </a>
            </template>
          </IntlFormatted>
          <button
            class="iconified-button"
            @click="$refs.modal_revoke_token.hide()"
          >
            <CrossIcon />
            {{ $t('generic.action.cancel') }}
          </button>
          <button class="iconified-button brand-button" @click="logout">
            <RightArrowIcon />
            {{ $t('settings.modal-revoke-token.action') }}
          </button>
        </div>
      </div>
    </Modal>

    <section class="universal-card">
      <h2>
        {{ $t('settings.account.user-profile.title') }}
      </h2>
      <p>{{ $t('settings.account.account-deletion.description') }}</p>
      <NuxtLink class="iconified-button" :to="`/user/${$auth.user.username}`">
        <UserIcon /> {{ $t('settings.account.account-deletion.action') }}
      </NuxtLink>
    </section>

    <section class="universal-card">
      <h2>
        {{ $t('settings.account.account-information.title') }}
      </h2>
      <p>
        {{ $t('settings.account.account-information.description') }}
      </p>
      <ul class="known-errors">
        <li v-if="hasMonetizationEnabled() && !email">
          {{
            $t(
              'settings.account.account-information.validation-error.email-required-for-monetization'
            )
          }}
        </li>
      </ul>
      <label for="email-input">
        <span class="label__title">
          {{ $t('settings.account.account-information.field.email.name') }}
        </span>
      </label>
      <input
        id="email-input"
        v-model="email"
        maxlength="2048"
        type="email"
        :placeholder="
          $t('settings.account.account-information.field.email.placeholder')
        "
      />
      <div class="button-group">
        <button
          type="button"
          class="iconified-button brand-button"
          :disabled="hasMonetizationEnabled() && !email"
          @click="saveChanges()"
        >
          <SaveIcon />
          {{ $t('generic.action.save-changes') }}
        </button>
      </div>
    </section>

    <section class="universal-card">
      <h2>
        {{ $t('settings.account.authorization-token.title') }}
      </h2>
      <p>
        {{ $t('settings.account.authorization-token.description') }}
      </p>
      <div class="input-group">
        <button type="button" class="iconified-button" @click="copyToken">
          <template v-if="copied">
            <CheckIcon />
            {{ $t('settings.account.authorization-token.action.copy.copied') }}
          </template>
          <template v-else>
            <CopyIcon />
            {{ $t('settings.account.authorization-token.action.copy.default') }}
          </template>
        </button>
        <button
          type="button"
          class="iconified-button"
          @click="$refs.modal_revoke_token.show()"
        >
          <SlashIcon />
          {{ $t('settings.account.authorization-token.action.revoke') }}
        </button>
      </div>
    </section>

    <section id="delete-account" class="universal-card">
      <h2>
        {{ $t('settings.account.account-deletion.title') }}
      </h2>
      <p>
        {{ $t('settings.account.account-deletion.description') }}
      </p>
      <button
        type="button"
        class="iconified-button danger-button"
        @click="$refs.modal_confirm.show()"
      >
        <TrashIcon />
        {{ $t('settings.account.account-deletion.action') }}
      </button>
    </section>
  </div>
</template>

<script>
import ModalConfirm from '~/components/ui/ModalConfirm'
import Modal from '~/components/ui/Modal'

import CrossIcon from '~/assets/images/utils/x.svg?inline'
import RightArrowIcon from '~/assets/images/utils/right-arrow.svg?inline'
import CheckIcon from '~/assets/images/utils/check.svg?inline'
import UserIcon from '~/assets/images/utils/user.svg?inline'
import SaveIcon from '~/assets/images/utils/save.svg?inline'
import CopyIcon from '~/assets/images/utils/clipboard-copy.svg?inline'
import TrashIcon from '~/assets/images/utils/trash.svg?inline'
import SlashIcon from '~/assets/images/utils/slash.svg?inline'

export default {
  components: {
    Modal,
    ModalConfirm,
    CrossIcon,
    RightArrowIcon,
    CheckIcon,
    SaveIcon,
    UserIcon,
    CopyIcon,
    TrashIcon,
    SlashIcon,
  },
  data() {
    return {
      copied: false,
      email: this.$auth.user.email,
      showKnownErrors: false,
    }
  },
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('settings.account.title'),
      }),
    }
  },
  methods: {
    async copyToken() {
      this.copied = true
      await navigator.clipboard.writeText(this.$auth.token)
    },
    async deleteAccount() {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.delete(
          `user/${this.$auth.user.id}`,
          this.$defaultHeaders()
        )
      } catch (err) {
        this.$notify({
          group: 'main',
          title: this.$t('generic.error.title'),
          text: err.response.data.description,
          type: 'error',
        })
      }

      this.$cookies.set('auth-token-reset', true)
      window.location.href = '/'

      this.$nuxt.$loading.finish()
    },
    logout() {
      this.$refs.modal_revoke_token.hide()
      this.$cookies.set('auth-token-reset', true)

      window.location.href = `${this.$axios.defaults.baseURL}auth/init?url=${process.env.domain}`
    },
    hasMonetizationEnabled() {
      return (
        this.$auth.user.payout_data.payout_wallet &&
        this.$auth.user.payout_data.payout_wallet_type &&
        this.$auth.user.payout_data.payout_address
      )
    },
    async saveChanges() {
      if (this.hasMonetizationEnabled() && !this.email) {
        this.showKnownErrors = true
        return
      }
      this.$nuxt.$loading.start()
      try {
        const data = {
          email: this.email ? this.email : null,
        }

        await this.$axios.patch(
          `user/${this.$auth.user.id}`,
          data,
          this.$defaultHeaders()
        )
        await this.$store.dispatch('auth/fetchUser', {
          token: this.$auth.token,
        })
      } catch (err) {
        this.$notify({
          group: 'main',
          title: this.$t('generic.error.title'),
          text: err.response.data.description,
          type: 'error',
        })
      }
      this.$nuxt.$loading.finish()
    },
  },
}
</script>
<style lang="scss" scoped>
.modal-revoke-token {
  padding: var(--spacing-card-bg);

  .button-group {
    width: fit-content;
    margin-left: auto;
  }
}
</style>
