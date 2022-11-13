import 'vue'

declare module 'vue' {
  interface GlobalComponents {
    Fragment: import('./vue-fragment').FragmentComponentType
  }
}
