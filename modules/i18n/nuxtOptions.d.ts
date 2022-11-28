import { Import } from '@babel/types'
import '@nuxt/types'

declare module '@nuxt/types' {
  interface NuxtOptions {
    i18n?: import('./index').Options
  }
}
