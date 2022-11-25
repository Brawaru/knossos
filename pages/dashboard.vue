<template>
  <div class="normal-page">
    <div class="normal-page__sidebar">
      <aside class="universal-card">
        <h1>
          {{ $t('dashboard.sidebar-title') }}
          <span class="beta-badge">
            {{ $t('generic.label.beta') }}
          </span>
        </h1>
        <NavStack>
          <NavStackItem
            link="/dashboard"
            :label="$t('dashboard.overview.title')"
          >
            <DashboardIcon />
          </NavStackItem>
          <!--          <NavStackItem link="/dashboard/projects" label="Projects">-->
          <!--            <ListIcon />-->
          <!--          </NavStackItem>-->
          <!--          <NavStackItem link="/dashboard/analytics" label="Analytics">-->
          <!--            <ChartIcon />-->
          <!--          </NavStackItem>-->
          <NavStackItem
            v-if="hasMonetization()"
            link="/dashboard/revenue"
            :label="$t('dashboard.revenue.title')"
          >
            <CurrencyIcon />
          </NavStackItem>
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

import DashboardIcon from '~/assets/images/utils/dashboard.svg?inline'
// import ChartIcon from '~/assets/images/utils/chart.svg?inline'
import CurrencyIcon from '~/assets/images/utils/currency.svg?inline'
// import ListIcon from '~/assets/images/utils/list.svg?inline'

const monetization = true

export default {
  name: 'Dashboard',
  components: {
    NavStack,
    NavStackItem,
    DashboardIcon,
    // ChartIcon,
    CurrencyIcon,
    // ListIcon,
  },
  methods: {
    hasMonetization() {
      return monetization
    },
  },
}
</script>

<style lang="scss" scoped></style>
