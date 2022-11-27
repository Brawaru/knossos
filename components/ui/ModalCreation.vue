<template>
  <Modal ref="modal" :header="$t('component.modal-creation.title')">
    <div class="modal-creation universal-labels">
      <div class="markdown-body">
        <p>
          {{ $t('component.modal-creation.description') }}
        </p>
      </div>
      <label for="project-type">
        <span class="label__title">
          <IntlFormatted
            message-id="component.modal-creation.fields.project-type.title"
          >
            <template #required="{ children }">
              <span class="required"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </span>
      </label>
      <Chips
        id="project-type"
        v-model="projectType"
        :items="this.$tag.projectTypes"
        :format-label="({ id }) => $translateProjectType(id)"
      />
      <label for="name">
        <span class="label__title">
          <IntlFormatted
            message-id="component.modal-creation.fields.name.title"
          >
            <template #required="{ children }">
              <span class="required"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </span>
      </label>
      <input
        id="name"
        v-model="name"
        type="text"
        maxlength="64"
        :placeholder="$t('component.modal-creation.fields.name.placeholder')"
        autocomplete="off"
        @input="updatedName()"
      />
      <label for="slug">
        <span class="label__title">
          <IntlFormatted message-id="component.modal-creation.fields.url.title">
            <template #required="{ children }">
              <span class="required"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </span>
      </label>
      <div class="text-input-wrapper">
        <div class="text-input-wrapper__before">
          https://modrinth.com/{{ projectType ? projectType.id : '???' }}/
        </div>
        <input
          id="slug"
          v-model="slug"
          type="text"
          maxlength="64"
          autocomplete="off"
          @input="manualSlug = true"
        />
      </div>
      <label for="additional-information">
        <span class="label__title">
          <IntlFormatted
            message-id="component.modal-creation.fields.summary.title"
          >
            <template #required="{ children }">
              <span class="required"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </span>
        <span class="label__description">
          {{ $t('component.modal-creation.fields.summary.description') }}
        </span>
      </label>
      <div class="textarea-wrapper">
        <textarea
          id="additional-information"
          v-model="description"
          maxlength="256"
        />
      </div>
      <div class="push-right input-group">
        <button class="iconified-button" @click="cancel">
          <CrossIcon />
          {{ $t('generic.action.cancel') }}
        </button>
        <button class="iconified-button brand-button" @click="createProject">
          <CheckIcon />
          {{ $t('generic.action.continue') }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
import CrossIcon from '~/assets/images/utils/x.svg?inline'
import CheckIcon from '~/assets/images/utils/right-arrow.svg?inline'
import Modal from '~/components/ui/Modal'
import Chips from '~/components/ui/Chips'

export default {
  name: 'ModalCreation',
  components: {
    Chips,
    CrossIcon,
    CheckIcon,
    Modal,
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
      projectType: this.$tag.projectTypes[0],
      name: '',
      slug: '',
      description: '',
      manualSlug: false,
    }
  },
  methods: {
    cancel() {
      this.$refs.modal.hide()
    },
    getProjectType() {
      return this.$tag.projectTypes.find((x) => this.projectType === x.display)
    },
    getClientSide() {
      switch (this.getProjectType().id) {
        case 'plugin':
          return 'unsupported'
        case 'resourcepack':
          return 'required'
        default:
          return 'unknown'
      }
    },
    getServerSide() {
      switch (this.getProjectType().id) {
        case 'plugin':
          return 'required'
        case 'resourcepack':
          return 'unsupported'
        default:
          return 'unknown'
      }
    },
    async createProject() {
      this.$nuxt.$loading.start()

      const projectType = this.projectType

      const formData = new FormData()

      formData.append(
        'data',
        JSON.stringify({
          title: this.name,
          project_type: projectType.actual,
          slug: this.slug,
          description: this.description,
          body: (() => {
            let body = ''

            if (
              this.$i18n.intlLocale.language !== 'en' ||
              this.$i18n.locale.includes('-x-')
            ) {
              body += this.$t(
                'component.modal-creation.auto-description.warning',
                {
                  projectType: this.projectType.id,
                }
              )
              body += '\n\n'
            }

            const unfilteredLines = this.$fmt
              .customMessage(
                this.$i18n.data['starter.md'],
                {
                  projectType: this.projectType.id,
                  projectName: this.name,
                  editLink: `https://modrinth.com/${this.projectType.id}/${this.slug}/edit`,
                  skip: '<!-- MR:SKIP-LINE -->',
                },
                {
                  ignoreTag: true,
                }
              )
              .split('\n')

            for (const line of unfilteredLines) {
              if (line.includes('<!-- MR:SKIP-LINE -->')) {
                continue
              }

              body += line + '\n'
            }

            return body
          })(),
          initial_versions: [],
          team_members: [
            {
              user_id: this.$auth.user.id,
              name: this.$auth.user.username,
              role: 'Owner',
            },
          ],
          categories: [],
          client_side: this.getClientSide(),
          server_side: this.getServerSide(),
          license_id: this.$tag.licenses.map((it) => it.short).includes('arr')
            ? 'arr'
            : this.$tag.licenses[0].short,
          is_draft: true,
        })
      )

      try {
        await this.$axios({
          url: 'project',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$auth.token,
          },
        })

        this.$refs.modal.hide()
        await this.$router.replace(`/${projectType.actual}/${this.slug}`)
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
      this.projectType = this.$tag.projectTypes[0]
      this.name = ''
      this.slug = ''
      this.description = ''
      this.manualSlug = false
      this.$refs.modal.show()
    },
    updatedName() {
      if (!this.manualSlug) {
        this.slug = this.name.toLowerCase().replaceAll(' ', '-')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.modal-creation {
  padding: var(--spacing-card-bg);
  display: flex;
  flex-direction: column;
  width: 600px;

  .markdown-body {
    margin-bottom: 0.5rem;
  }

  input {
    width: 20rem;
    max-width: 100%;
  }

  .text-input-wrapper {
    width: 100%;
  }

  textarea {
    min-height: 5rem;
  }

  .input-group {
    margin-top: var(--spacing-card-md);
  }
}
</style>
