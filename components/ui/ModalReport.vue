<template>
  <Modal ref="modal" :header="$t('component.modal-report.title', { itemType })">
    <div class="modal-report legacy-label-styles">
      <div class="markdown-body">
        <p>
          <IntlFormatted message-id="component.modal-report.description">
            <template #tos-link="{ children }">
              <nuxt-link to="/legal/terms">
                <Fragment :of="children" />
              </nuxt-link>
            </template>
            <template #rules-link="{ children }">
              <nuxt-link to="/legal/rules">
                <Fragment :of="children" />
              </nuxt-link>
            </template>
          </IntlFormatted>
        </p>
      </div>
      <label class="report-label" for="report-type">
        <span>
          <strong>
            {{ $t('component.modal-report.fields.reason.title') }}
          </strong>
        </span>
      </label>
      <multiselect
        id="report-type"
        v-model="reportType"
        :options="$store.state.tag.reportTypes"
        :custom-label="(value) => $t(`report-type.${value}`)"
        :multiple="false"
        :searchable="false"
        :show-no-results="false"
        :show-labels="false"
        :placeholder="$t('component.modal-report.fields.reason.placeholder')"
      />
      <label class="report-label" for="additional-information">
        <strong>
          {{ $t('component.modal-report.fields.info.title') }}
        </strong>
        <span>
          {{ $t('component.modal-report.fields.info.description') }}
        </span>
      </label>
      <div class="textarea-wrapper">
        <Chips
          v-model="bodyViewType"
          class="separator"
          :items="['source', 'preview']"
          :format-label="(it) => $t(`markdown-editor.tab.${it}`)"
        />
        <div v-if="bodyViewType === 'source'" class="textarea-wrapper">
          <textarea id="body" v-model="body" spellcheck="true" />
        </div>
        <div
          v-else
          v-highlightjs
          class="preview"
          v-html="$xss($md.render(body))"
        ></div>
      </div>
      <div class="button-group">
        <button class="iconified-button" @click="cancel">
          <CrossIcon />
          {{ $t('generic.action.cancel') }}
        </button>
        <button class="iconified-button brand-button" @click="submitReport">
          <CheckIcon />
          {{ $t('component.modal-report.action') }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Multiselect from 'vue-multiselect'
import CrossIcon from '~/assets/images/utils/x.svg?inline'
import CheckIcon from '~/assets/images/utils/check.svg?inline'
import Modal from '~/components/ui/Modal'
import Chips from '~/components/ui/Chips'

export default {
  name: 'ModalReport',
  components: {
    Chips,
    CrossIcon,
    CheckIcon,
    Modal,
    Multiselect,
  },
  props: {
    itemType: {
      type: String,
      default: '',
    },
    itemId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      reportType: '',
      body: '',
      bodyViewType: 'source',
    }
  },
  methods: {
    cancel() {
      this.reportType = ''
      this.body = ''
      this.bodyViewType = 'source'

      this.$refs.modal.hide()
    },
    async submitReport() {
      this.$nuxt.$loading.start()
      try {
        const data = {
          report_type: this.reportType,
          item_id: this.itemId,
          item_type: this.itemType,
          body: this.body,
        }
        await this.$axios.post('report', data, this.$defaultHeaders())

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
  },
}
</script>

<style scoped lang="scss">
.modal-report {
  padding: var(--spacing-card-bg);
  display: flex;
  flex-direction: column;

  .markdown-body {
    margin-bottom: 1rem;
  }

  .multiselect {
    max-width: 20rem;
    margin-bottom: 1rem;
  }

  .report-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .button-group {
    margin-left: auto;
    margin-top: 1.5rem;
  }

  .textarea-wrapper {
    margin-top: 1rem;
    height: 12rem;

    textarea {
      // here due to a bug in safari
      max-height: 9rem;
    }

    .preview {
      overflow-y: auto;
    }
  }
}
</style>
