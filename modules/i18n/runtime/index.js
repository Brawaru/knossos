// @ts-check

import { computed, getCurrentInstance } from 'vue'

export function useTranslations() {
  const instance = getCurrentInstance()

  if (instance == null) {
    throw new Error('useTranslation must be called within')
  }

  const vm = 'proxy' in instance ? instance.proxy : instance

  return vm.$t
}
