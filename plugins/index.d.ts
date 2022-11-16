import 'vue'
import 'vue/types/vue'
import '@nuxt/types'

type Shorthands = import('./typed-shorthands').DefinedHelpers

declare module 'vue/types/vue' {
  interface Vue extends Shorthands {}
}

declare module '@nuxt/types' {
  interface Context extends Shorthands {}
}

declare module 'vue' {
  interface GlobalComponents {
    Fragment: import('./vue-fragment').FragmentComponentType
  }
}
