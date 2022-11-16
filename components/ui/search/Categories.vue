<template>
  <div class="categories">
    <span
      v-for="category in categoriesFiltered"
      :key="category.name"
      class="category"
    >
      <span v-if="category.icon" class="icon" v-html="category.icon" />
      {{ $translateCategory(category.name) }}
    </span>
    <span v-for="loader in loadersFiltered" :key="loader.name" class="category">
      <span v-if="loader.icon" class="icon" v-html="loader.icon" />
      {{ $translateLoader(loader.name) }}
    </span>
  </div>
</template>

<script>
// @ts-check
import { defineComponent } from 'vue'

// FIXME: remove ts directives once store is typed

export default defineComponent({
  name: 'Categories',
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    categoriesFiltered() {
      // @ts-expect-error
      return this.$tag.categories.filter(
        // @ts-expect-error
        (category) =>
          this.categories.includes(category.name) &&
          (category.project_type == null || category.project_type === this.type)
      )
    },
    loadersFiltered() {
      return this.$tag.loaders.filter(
        // @ts-expect-error
        (loader) =>
          this.categories.includes(loader.name) && loader.name !== 'minecraft'
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;

  .category {
    display: flex;
    column-gap: 0.125rem;
    color: var(--color-icon);
    align-items: center;

    .icon,
    .icon::v-deep svg {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
