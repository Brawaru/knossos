<template>
  <div>
    <section class="universal-card">
      <h2>{{ $t('dashboard.analytics.title') }}</h2>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  fetch() {},
  head() {
    return {
      title: this.$t('generic.meta.page-title', {
        page: this.$t('dashboard.analytics.title'),
      }),
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped></style>
