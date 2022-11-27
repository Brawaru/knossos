<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>{{ $t('settings.title') }}</h1>
        <NavStack>
          <NavStackItem
            link="/settings"
            :label="$t('settings.display.title.short')"
          >
            <PaintbrushIcon />
          </NavStackItem>
          <template v-if="$auth.user">
            <h3>{{ $t('settings.category.user-settings.title') }}</h3>
            <NavStackItem
              link="/settings/account"
              :label="$t('settings.account.title.short')"
            >
              <UserIcon />
            </NavStackItem>
            <NavStackItem
              link="/settings/follows"
              :label="$t('settings.follows.title.short')"
            >
              <HeartIcon />
            </NavStackItem>
            <NavStackItem
              link="/settings/monetization"
              :label="$t('settings.monetization.title.short')"
              beta
            >
              <CurrencyIcon />
            </NavStackItem>
          </template>
        </NavStack>
      </aside>
    </div>
    <div class="normal-page__content">
      <NuxtChild />
    </div>
  </div>
</template>

<script>
import NavStack from '~/components/ui/NavStack'
import NavStackItem from '~/components/ui/NavStackItem'

import PaintbrushIcon from '~/assets/images/utils/paintbrush.svg?inline'
import UserIcon from '~/assets/images/utils/user.svg?inline'
import HeartIcon from '~/assets/images/utils/heart.svg?inline'
import CurrencyIcon from '~/assets/images/utils/currency.svg?inline'

export default {
  name: 'Settings',
  components: {
    NavStack,
    NavStackItem,
    PaintbrushIcon,
    UserIcon,
    HeartIcon,
    CurrencyIcon,
  },
}
</script>

<style lang="scss" scoped></style>
