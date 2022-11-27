<template>
  <div>
    <ModalTransfer
      v-if="enrolled"
      ref="modal_transfer"
      :wallet="payoutWallet"
      :account-type="$auth.user.payout_data.payout_wallet_type"
      :account="$auth.user.payout_data.payout_address"
      :balance="userBalance"
      :min-withdraw="minWithdraw"
    />
    <section class="universal-card">
      <h2>
        {{ $t('dashboard.revenue.withdraw.title') }}
      </h2>
      <div v-if="userBalance >= minWithdraw">
        <p>
          <IntlFormatted
            message-id="dashboard.revenue.withdraw.description"
            :values="{ amount: $formatMoney(userBalance) }"
            :tags="['strong']"
          >
            <template #enroll-cta="{ children }">
              <span v-show="!enrolled"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </p>

        <div v-if="enrolled" class="buttons">
          <button
            class="iconified-button brand-button"
            @click="$refs.modal_transfer.show()"
          >
            <TransferIcon />
            {{
              $t('dashboard.revenue.withdraw.action.transfer', {
                provider: $t(`payout-provider.${payoutWallet}`),
              })
            }}
          </button>
          <NuxtLink class="iconified-button" to="/settings/monetization">
            <SettingsIcon />
            {{ $t('dashboard.revenue.withdraw.action.settings') }}
          </NuxtLink>
        </div>
      </div>
      <p v-else-if="userBalance > 0">
        <IntlFormatted
          message-id="dashboard.revenue.withdraw.description.below-minimum"
          :tags="['strong']"
          :values="{
            amount: $formatMoney(userBalance),
            minimumAmount: $formatMoney(minWithdraw),
          }"
        />
      </p>
      <p v-else>
        {{ $t('dashboard.revenue.withdraw.description.no-earnings') }}
      </p>
      <div v-if="!enrolled">
        <NuxtLink class="iconified-button" to="/settings/monetization">
          <SettingsIcon /> {{ $t('dashboard.revenue.withdraw.action.enroll') }}
        </NuxtLink>
      </div>
    </section>
    <section class="universal-card">
      <IntlFormatted
        :message="$i18n.data['fees-explainer.html']"
        :tags="['h2', 'h3', 'p', 'ul', 'li', 'strong']"
        :values="{ minimumAmount: $formatMoney(minWithdraw) }"
      >
      </IntlFormatted>
    </section>
  </div>
</template>

<script>
import TransferIcon from '~/assets/images/utils/transfer.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'
import ModalTransfer from '~/components/ui/ModalTransfer'

export default {
  components: { TransferIcon, SettingsIcon, ModalTransfer },
  data() {
    return {
      minWithdraw: 0.26,
      enrolled:
        this.$auth.user.payout_data.payout_wallet &&
        this.$auth.user.payout_data.payout_wallet_type &&
        this.$auth.user.payout_data.payout_address,
    }
  },
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('dashboard.revenue.title'),
      }),
    }
  },
  computed: {
    /** @returns {number} */
    userBalance() {
      return this.$auth.user.payout_data.balance
    },
    /** @returns {string} */
    payoutWallet() {
      return this.$auth.user.payout_data.payout_wallet
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
strong {
  color: var(--color-text-dark);
  font-weight: 500;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-card-sm);
}
</style>
