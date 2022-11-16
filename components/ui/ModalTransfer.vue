<template>
  <Modal ref="modal" :header="$t('component.modal-transfer.title')">
    <div class="modal-transfer">
      <span>
        <IntlFormatted message-id="component.modal-transfer.description">
          <template #~balance>
            <strong>
              {{
                $fmt.number(balance, {
                  style: 'currency',
                  currency: 'USD',
                })
              }}
            </strong>
          </template>
        </IntlFormatted>
      </span>
      <div class="confirmation-input">
        <input
          id="confirmation"
          v-model="amount"
          type="text"
          pattern="^\d*(\.\d{0,2})?$"
          autocomplete="off"
          :placeholder="
            $t('component.modal-transfer.fields.amount.placeholder')
          "
        />
      </div>
      <div class="confirm-text">
        <Checkbox
          v-if="
            isValidInput() &&
            parseInput() >= minWithdraw &&
            parseInput() <= balance
          "
          v-model="consentedFee"
        >
          <template v-if="wallet === 'venmo'">
            {{
              $t('component.modal-transfer.fields.venmo-fee-consent.label', {
                fee: $fmt.number(0.25, { style: 'currency', currency: 'USD' }),
                wallet,
              })
            }}
          </template>
          <template v-else>
            {{
              $t('component.modal-transfer.fields.regular-fee-consent.label', {
                fee: $fmt.number(calcProcessingFees(), {
                  style: 'currency',
                  currency: 'USD',
                }),
                wallet,
              })
            }}
          </template>
        </Checkbox>
        <Checkbox
          v-if="
            isValidInput() &&
            parseInput() >= minWithdraw &&
            parseInput() <= balance
          "
          v-model="consentedAccount"
        >
          {{
            $t('component.modal-transfer.fields.account-confirm.label', {
              wallet,
              account,
            })
          }}
        </Checkbox>
        <span
          v-else-if="validInput && parseInput() < minWithdraw"
          class="invalid"
        >
          {{
            $t('component.modal-transfer.error.min-amount-required', {
              amount: $fmt.number(minWithdraw, {
                style: 'currency',
                currency: 'USD',
              }),
            })
          }}
        </span>
        <span v-else-if="validInput && parseInput() > balance" class="invalid">
          {{
            $t('component.modal-transfer.error.max-amount-exceeded', {
              amount: $fmt.number(balance, {
                style: 'currency',
                currency: 'USD',
              }),
            })
          }}
        </span>
        <span v-else-if="amount.length > 0" class="invalid">
          {{ $t('component.modal-transfer.error.illegal-input', { amount }) }}
        </span>
      </div>
      <div class="button-group">
        <NuxtLink class="iconified-button" to="/settings/monetization">
          <SettingsIcon /> {{ $t('component.modal-transfer.action.settings') }}
        </NuxtLink>
        <button class="iconified-button" @click="cancel">
          <CrossIcon />
          {{ $t('generic.action.cancel') }}
        </button>
        <button
          class="iconified-button brand-button"
          :disabled="!consentedFee || !consentedAccount"
          @click="proceed"
        >
          <TransferIcon />
          {{ $t('component.modal-transfer.action.transfer') }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import CrossIcon from '~/assets/images/utils/x.svg?inline'
import TransferIcon from '~/assets/images/utils/transfer.svg?inline'
import SettingsIcon from '~/assets/images/utils/settings.svg?inline'
import Modal from '~/components/ui/Modal'
import Checkbox from '~/components/ui/Checkbox'

export default {
  name: 'ModalTransfer',
  components: {
    Checkbox,
    CrossIcon,
    SettingsIcon,
    TransferIcon,
    Modal,
  },
  props: {
    wallet: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    minWithdraw: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      consentedFee: false,
      consentedAccount: false,
      amount: '',
      validInput: false,
    }
  },
  methods: {
    cancel() {
      this.amount = ''
      this.consentedFee = false
      this.consentedAccount = false
      this.validInput = false
      this.$refs.modal.hide()
    },
    async proceed() {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.post(
          `user/${this.$auth.user.id}/payouts`,
          {
            amount: Number(this.amount.replace('$', '')),
          },
          this.$defaultHeaders()
        )
        await this.$store.dispatch('auth/fetchUser', {
          token: this.$auth.token,
        })

        this.$refs.modal.hide()
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
    show() {
      this.$refs.modal.show()
    },
    isValidInput() {
      const regex = /^\$?(\d*(\.\d{2})?)$/gm
      this.validInput = regex.test(this.amount) && this.amount.length > 0
      return this.validInput
    },
    parseInput() {
      const regex = /^\$?(\d*(\.\d{2})?)$/gm
      const matches = regex.exec(this.amount)
      return parseFloat(matches[1])
    },
    calcProcessingFees() {
      if (this.wallet === 'venmo') {
        return 0.25
      } else {
        return Math.max(0.25, Math.min(this.parseInput() * 0.02, 20))
      }
    },
  },
}
</script>

<style scoped lang="scss">
.modal-transfer {
  padding: var(--spacing-card-bg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-card-sm);

  .confirmation-input {
    input {
      width: 14rem;
      max-width: 100%;
    }
  }

  .button-group {
    margin-top: var(--spacing-card-md);
    justify-content: right;
  }

  strong {
    color: var(--color-text-dark);
    font-weight: 500;
  }

  .invalid {
    color: var(--color-special-red);
  }

  .confirm-text {
    margin-top: var(--spacing-card-sm);
    min-height: 7rem;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-card-sm);
  }
}
</style>
