// @ts-check
/* eslint-disable vue/require-prop-types */

import Vue, { defineComponent } from 'vue'

const Fragment = defineComponent({
  functional: true,
  props: {
    of: {
      type: /** @type {import('vue').PropType<import('vue').VNode[]>} */ (
        Array
      ),
    },
  },
  render(_, { props, children }) {
    return props.of ?? children ?? []
  },
})

Vue.use({
  install(vue) {
    vue.component('Fragment', Fragment)
  },
})

/** @typedef {typeof Fragment} FragmentComponentType */
