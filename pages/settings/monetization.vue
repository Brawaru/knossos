<template>
  <div>
    <section v-if="enrolled" class="universal-card">
      <h2>
        {{ $t('settings.monetization.revenue.title') }}
      </h2>
      <p>
        {{ $t('settings.monetization.revenue.description') }}
      </p>
      <NuxtLink class="iconified-button" to="/dashboard/revenue">
        <ChartIcon /> {{ $t('settings.monetization.revenue.action') }}
      </NuxtLink>
    </section>
    <section class="universal-card">
      <h2 class="title">
        {{ $t('settings.monetization.enrollment.title') }}
      </h2>
      <template v-if="!enrolled && !$auth.user.email">
        <p v-if="!enrolled">
          {{
            $t('settings.monetization.enrollment.description.must-have-email')
          }}
        </p>
        <NuxtLink class="iconified-button" to="/settings/account">
          <SettingsIcon />
          {{ $t('settings.monetization.enrollment.action.account-settings') }}
        </NuxtLink>
      </template>
      <template v-else-if="editing || !enrolled">
        <p v-if="!enrolled">
          {{ $t('settings.monetization.enrollment.description.not-enrolled') }}
        </p>
        <div class="enroll">
          <Chips
            v-model="selectedWallet"
            :starting-value="selectedWallet"
            :items="wallets"
            :format-label="$formatWallet"
            @input="onChangeWallet()"
          />

          <p>
            {{
              $t('settings.monetization.enrollment.form.description', {
                provider: $t(`payout-provider.${selectedWallet}`),
              })
            }}
          </p>
          <div class="input-group">
            <Multiselect
              v-model="accountType"
              :options="getAccountTypes()"
              :custom-label="
                (type) =>
                  $t(
                    'settings.monetization.enrollment.form.field.account-type.value',
                    {
                      type,
                    }
                  )
              "
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              :allow-empty="false"
            />

            <label class="hidden" for="account-input">
              {{
                $t(
                  'settings.monetization.enrollment.form.field.account.label',
                  {
                    provider: $t(`payout-provider.${selectedWallet}`),
                    accountType,
                  }
                )
              }}
            </label>
            <input
              id="account-input"
              v-model="account"
              :placeholder="
                $t(
                  'settings.monetization.enrollment.form.field.account.placeholder',
                  {
                    provider: $t(`payout-provider.${selectedWallet}`),
                    accountType,
                  }
                )
              "
              :type="accountType === 'email' ? 'email' : ''"
            />
            <span v-if="accountType === 'phone'">
              {{ $t('settings.monetization.enrollment.form.tip.phone-format') }}
            </span>
          </div>
          <div class="input-group">
            <button
              class="iconified-button brand-button"
              @click="updatePayoutData(false)"
            >
              <SaveIcon />
              {{ $t('settings.monetization.enrollment.form.action.save') }}
            </button>
            <button
              v-if="enrolled"
              class="iconified-button danger-button"
              @click="updatePayoutData(true)"
            >
              <TrashIcon />
              {{ $t('settings.monetization.enrollment.form.action.remove') }}
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <p>
          {{
            $t('settings.monetization.enrollment.description.enrolled', {
              provider: $t(`payout-provider.${selectedWallet}`),
            })
          }}
        </p>
        <button class="iconified-button brand-button" @click="editing = true">
          <EditIcon />
          {{ $t('settings.monetization.enrollment.action.edit') }}
        </button>
      </template>
    </section>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Chips from '~/components/ui/Chips'
import SaveIcon from '~/assets/images/utils/save.svg?inline'
import TrashIcon from '~/assets/images/utils/trash.svg?inline'
import EditIcon from '~/assets/images/utils/edit.svg?inline'
import ChartIcon from '~/assets/images/utils/chart.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'

export default {
  components: {
    Multiselect,
    Chips,
    SaveIcon,
    TrashIcon,
    EditIcon,
    ChartIcon,
    SettingsIcon,
  },
  data() {
    return {
      editing: false,
      enrolled:
        this.$auth.user.payout_data.payout_wallet &&
        this.$auth.user.payout_data.payout_wallet_type &&
        this.$auth.user.payout_data.payout_address,
      wallets: ['paypal', 'venmo'],
      selectedWallet: this.$auth.user.payout_data.payout_wallet ?? 'paypal',
      accountType:
        this.$auth.user.payout_data.payout_wallet_type ??
        this.getAccountTypes()[0],
      account: this.$auth.user.payout_data.payout_address ?? '',
    }
  },
  head: {
    title: 'Monetization settings - Modrinth',
  },
  methods: {
    getAccountTypes() {
      const types = []
      if (this.selectedWallet === 'venmo') {
        types.push('user_handle')
      }
      types.push('email')
      types.push('phone')
      return types
    },
    formatAccountType(value) {
      switch (value) {
        case 'email':
          return 'Email address'
        case 'phone':
          return 'Phone number'
        case 'user_handle':
          return 'Username'
        default:
          return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    onChangeWallet() {
      this.account = ''

      // Set default account type for each wallet
      if (this.selectedWallet === 'paypal') {
        this.accountType = 'email'
      } else if (this.selectedWallet === 'venmo') {
        this.accountType = 'user_handle'
      }
    },
    async updatePayoutData(unenroll) {
      this.$nuxt.$loading.start()
      if (unenroll) {
        this.selectedWallet = 'paypal'
        this.accountType = this.getAccountTypes()[0]
        this.account = ''
      }
      try {
        const data = {
          payout_data: unenroll
            ? null
            : {
                payout_wallet: this.selectedWallet,
                payout_wallet_type: this.accountType,
                payout_address: this.account,
              },
        }

        await this.$axios.patch(
          `user/${this.$auth.user.id}`,
          data,
          this.$defaultHeaders()
        )
        await this.$store.dispatch('auth/fetchUser', {
          token: this.$auth.token,
        })

        this.editing = false
        this.enrolled = !unenroll
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
<style lang="scss" scoped></style>
