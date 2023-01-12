// @ts-check

import { NumberFormat } from '@formatjs/intl-numberformat/src/core'
import { toLocaleString as _toLocaleString } from '@formatjs/intl-numberformat/src/to_locale_string'

/**
 * @param {Parameters<typeof _toLocaleString>[1]} locales
 * @param {Parameters<typeof _toLocaleString>[2]} options
 * @returns {string}
 * @this {number}
 */
function toLocaleString(locales, options) {
  return _toLocaleString(this, locales, options)
}

/**
 * List of all global sites that may or many not contain the `Intl` object, or
 * on which they will be defined.
 *
 * It tries the following sites: `global`, `globalThis`, `window`. If any of
 * those is missing then `null` value will be on its place.
 */
const injectionSites = /** @type {const} */ ([
  typeof global === 'undefined' ? null : global,
  typeof globalThis === 'undefined' ? null : globalThis,
  typeof window === 'undefined' ? null : window,
])

for (const target of injectionSites) {
  if (target == null) continue

  // @ts-expect-error - TS thinks this will always exist
  if ((target.Intl?.NumberFormat ?? null) !== NumberFormat) {
    if (target.Intl == null) target.Intl = /** @type {any} */ ({})

    Object.defineProperty(target.Intl, 'NumberFormat', {
      configurable: true,
      value: NumberFormat,
    })
  }

  if (target.Number.prototype.toLocaleString !== toLocaleString) {
    Object.defineProperty(target.Number.prototype, 'toLocaleString', {
      configurable: true,
      value: toLocaleString,
    })
  }
}

require('@formatjs/intl-numberformat/locale-data/en')
