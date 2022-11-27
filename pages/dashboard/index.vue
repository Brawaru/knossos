<template>
  <div>
    <section class="universal-card">
      <h2>{{ $t('dashboard.overview.title') }}</h2>
      <div class="metrics">
        <div class="metric">
          <div class="label">
            {{ $t('dashboard.overview.metric.downloads.title') }}
          </div>
          <div class="value">
            {{ $fmt.compactNumber(totalDownloads) }}
          </div>
          <span>
            {{
              $t('dashboard.overview.metric.downloads.label', {
                projects: userProjects,
              })
            }}
          </span>
          <!--          <NuxtLink class="goto-link" to="/dashboard/analytics"-->
          <!--            >View breakdown-->
          <!--            <ChevronRightIcon-->
          <!--              class="featured-header-chevron"-->
          <!--              aria-hidden="true"-->
          <!--          /></NuxtLink>-->
        </div>
        <div class="metric">
          <div class="label">
            {{ $t('dashboard.overview.metric.followers.title') }}
          </div>
          <div class="value">
            {{ $fmt.compactNumber(totalFollowers) }}
          </div>
          <span>
            <span>
              {{
                $t('dashboard.overview.metric.downloads.label', {
                  projects: userProjects,
                })
              }}
            </span>
          </span>
          <!--          <NuxtLink class="goto-link" to="/dashboard/analytics"-->
          <!--            >View breakdown-->
          <!--            <ChevronRightIcon-->
          <!--              class="featured-header-chevron"-->
          <!--              aria-hidden="true"-->
          <!--          /></NuxtLink>-->
        </div>
        <div class="metric">
          <div class="label">
            {{ $t('dashboard.overview.metric.revenue.title') }}
          </div>
          <div class="value">{{ $formatMoney(payouts.all_time) }}</div>
          <span>
            {{
              $t('dashboard.overview.metric.revenue.label', {
                amount: $formatMoney(payouts.last_month),
              })
            }}
          </span>
          <!--          <NuxtLink class="goto-link" to="/dashboard/analytics"-->
          <!--            >View breakdown-->
          <!--            <ChevronRightIcon-->
          <!--              class="featured-header-chevron"-->
          <!--              aria-hidden="true"-->
          <!--          /></NuxtLink>-->
        </div>
        <div class="metric">
          <div class="label">
            {{ $t('dashboard.overview.metric.balance.title') }}
          </div>
          <div class="value">
            {{ $formatMoney(userBalance) }}
          </div>
          <NuxtLink
            v-if="userBalance >= minWithdraw"
            class="goto-link"
            to="/dashboard/revenue"
          >
            {{ $t('dashboard.overview.metric.balance.action') }}
            <ChevronRightIcon
              class="featured-header-chevron"
              aria-hidden="true"
            />
          </NuxtLink>
          <span v-else>
            {{
              $t('dashboard.overview.metric.balance.label', {
                minimumAmount: $formatMoney(minWithdraw),
              })
            }}
          </span>
        </div>
      </div>
    </section>
    <section class="universal-card more-soon">
      <h2>{{ $t('dashboard.overview.more-soon.title') }}</h2>
      <p>
        {{ $t('dashboard.overview.more-soon.description') }}
      </p>
    </section>
  </div>
</template>

<script>
import ChevronRightIcon from '~/assets/images/utils/chevron-right.svg?inline'

export default {
  components: { ChevronRightIcon },
  async asyncData(data) {
    const [payouts] = (
      await Promise.all([
        data.$axios.get(
          `user/${data.$auth.user.id}/payouts`,
          data.$defaultHeaders()
        ),
      ])
    ).map((it) => it.data)

    payouts.all_time = Math.floor(payouts.all_time * 100) / 100
    payouts.last_month = Math.floor(payouts.last_month * 100) / 100

    return {
      payouts,
    }
  },
  data() {
    return {
      minWithdraw: 0.26,
    }
  },
  fetch() {},
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('dashboard.title'),
      }),
    }
  },
  computed: {
    /** @returns {number} */
    totalDownloads() {
      return this.$user.projects.reduce((agg, x) => agg + x.downloads, 0)
    },
    /** @returns {number} */
    totalFollowers() {
      return this.$user.projects.reduce((agg, x) => agg + x.followers, 0)
    },
    /** @returns {number} */
    userProjects() {
      return this.$user.projects.length
    },
    /** @returns {number} */
    userBalance() {
      return this.$auth.user.payout_data.balance
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.metrics {
  display: grid;
  grid-gap: var(--spacing-card-md);
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

  .metric {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-bg);
    border-radius: var(--size-rounded-card);
    padding: var(--spacing-card-lg);
    gap: var(--spacing-card-md);

    .label {
      color: var(--color-heading);
      font-weight: bold;
      font-size: 1rem;
    }

    .value {
      color: var(--color-text-dark);
      font-weight: bold;
      font-size: 2rem;
    }
  }
}
</style>
