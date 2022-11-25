<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>{{ $t('legal.title') }}</h1>
        <NavStack>
          <NavStackItem
            link="/legal/terms"
            :label="$t('legal.terms.title.long')"
          >
            <TermsIcon />
          </NavStackItem>
          <NavStackItem
            link="/legal/privacy"
            :label="$t('legal.privacy.title.long')"
          >
            <PrivacyIcon />
          </NavStackItem>
          <NavStackItem
            link="/legal/rules"
            :label="$t('legal.rules.title.long')"
          >
            <RulesIcon />
          </NavStackItem>
          <NavStackItem link="/legal/security" label="Security Notice">
            <ShieldIcon />
          </NavStackItem>
        </NavStack>
      </aside>
    </div>
    <div class="normal-page__content">
      <div v-if="$i18n.locale != 'en-US'" class="card warning">
        <IntlFormatted message-id="legal.common.warning">
          <template #sr-only="{ children }">
            <span class="sr-only"><Fragment :of="children" /></span>
          </template>
        </IntlFormatted>
      </div>
      <NuxtChild class="universal-card" />
    </div>
  </div>
</template>

<script>
import NavStack from '~/components/ui/NavStack'
import NavStackItem from '~/components/ui/NavStackItem'

import TermsIcon from '~/assets/images/utils/heart-handshake.svg?inline'
import PrivacyIcon from '~/assets/images/utils/lock.svg?inline'
import RulesIcon from '~/assets/images/sidebar/admin.svg?inline'
import ShieldIcon from '~/assets/images/utils/shield.svg?inline'

export default {
  name: 'Legal',
  components: {
    NavStack,
    NavStackItem,
    TermsIcon,
    PrivacyIcon,
    RulesIcon,
    ShieldIcon,
  },
}
</script>

<style lang="scss" scoped>
.normal-page__content ::v-deep a {
  color: var(--color-link);
  text-decoration: underline;

  &:focus-visible,
  &:hover {
    color: var(--color-link-hover);
  }

  &:active {
    color: var(--color-link-active);
  }
}
</style>
