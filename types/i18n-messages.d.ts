// This file is generated automatically from ~/i18n/en-US
// Use bin/i18n-type-gen.mjs script to re-generate it.

import '~/modules/i18n/templates/i18n'

declare module '~/modules/i18n/templates/i18n.types' {
  interface CustomMessages {}
}

type DechromifiedMeta<T = typeof import('~/i18n/en-US/meta.json')> = {
  [K in keyof T]: T[K] extends { message: string } ? T[K]['message'] : never
}

declare module '~/modules/i18n/templates/types' {
  interface LocaleData extends DechromifiedMeta {}

  interface LocaleImportedData {}
}
