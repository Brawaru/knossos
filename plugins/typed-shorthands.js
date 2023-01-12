// @ts-check

/**
 * @typedef {object} FormatFileSizeOptionsBase
 * @property {'short' | 'long'} [unitDisplay] Unit formatting style.
 * @property {'short' | 'long'} [bytesUnitDisplay] Bytes unit formatting style.
 */

/**
 * @typedef {Omit<
 *   import('@formatjs/intl').FormatNumberOptions,
 *   | 'notation'
 *   | 'style'
 *   | 'unit'
 *   | 'unitDisplay'
 *   | 'currency'
 *   | 'currencyDisplay'
 *   | 'currencySign'
 * >} FormatFileSizeOptionsIntl
 */

/** @typedef {FormatFileSizeOptionsIntl & FormatFileSizeOptionsBase} FormatFileSizeOptions */

const defaultFileSizeOptions = /** @type {const} */ ({
  unitDisplay: 'short',
  bytesUnitDisplay: 'long',
})

/** @param {Partial<FormatFileSizeOptions> | undefined} options */
function bytesDisplay(options) {
  const o = options ?? defaultFileSizeOptions
  return o.bytesUnitDisplay ?? o.unitDisplay ?? 'short'
}

/**
 * @param {FormatFileSizeOptions | undefined} options
 * @returns {FormatFileSizeOptionsIntl | undefined}
 */
function numberFormatOptions(options) {
  if (options == null) return {}
  const o = { ...options }
  delete o.bytesUnitDisplay
  return o
}

const kibibyte = 1024

/**
 * Formats provided number of bytes into a human readable file size in compact
 * notation.
 *
 * The size is converted in powers of two and the resulting strings will have
 * binary prefix. For powers of ten you can use standard Intl.NumberFormat API.
 *
 * @param {number} bytes File size in bytes.
 * @param {FormatFileSizeOptions} [options] File size format options.
 * @returns {string} Formatted file size.
 * @this {import('@nuxt/types').Context}
 */
function formatFileSize(bytes, options = defaultFileSizeOptions) {
  if (bytes === 0) {
    return this.$t(
      bytesDisplay(options) === 'long'
        ? 'unit.size.bytes.long'
        : 'unit.size.bytes.short',
      {
        value: this.$fmt.compactNumber(0, numberFormatOptions(options)),
      }
    )
  }

  const sizes = /** @type {const} */ ([
    'bytes',
    'kibibytes',
    'mibibytes',
    'gibibytes',
  ])

  let i = Math.floor(Math.log(bytes) / Math.log(kibibyte))

  let sel = sizes[i]

  if (sel == null) {
    i = 0
    sel = 'bytes'
  }

  /** @type {'short' | 'long'} */
  let unitDisplay

  if (sel === 'bytes') {
    unitDisplay = bytesDisplay(options)
  } else {
    unitDisplay = options?.unitDisplay ?? 'short'
  }

  return this.$t(`unit.size.${sel}.${unitDisplay}`, {
    value: this.$fmt.compactNumber(
      bytes / Math.pow(kibibyte, i),
      numberFormatOptions(options)
    ),
  })
}

/**
 * Formats for display provided amount of money according to the current locale
 * and in compact notation.
 *
 * @param {number} amount Amount to format.
 * @param {import('@formatjs/intl').FormatNumberOptions} overrides Overrides for
 *   the default formatting settings.
 * @returns {string} Formatted amount of money for display.
 * @this {import('@nuxt/types').Context}
 */
function formatMoney(amount, overrides) {
  return String(
    this.$fmt.compactNumber(amount, {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...overrides,
    })
  )
}

/**
 * @typedef {object} DefinedHelpers
 * @property {typeof formatFileSize} $formatFileSize
 * @property {typeof formatMoney} $formatMoney
 */

/** @type {import('@nuxt/types').Plugin} */
export default (ctx, inject) => {
  inject('formatFileSize', formatFileSize.bind(ctx))
  inject('formatMoney', formatMoney.bind(ctx))
}
