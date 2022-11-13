// @ts-check

// This code contains many portions of code from @formatjs/intl and relative modules that cannot be imported easily.
// Those portions are licensed under MIT licences, which are available at:
// - https://github.com/formatjs/formatjs/blob/main/packages/intl/LICENSE.md
// - https://github.com/formatjs/formatjs/blob/main/packages/intl-numberformat/LICENSE.md
import { IntlError, IntlErrorCode } from '@formatjs/intl'
import '~/modules/i18n/forceNumberFormatPolyfill'
import { getFormatter } from '@formatjs/intl/src/number'
import {
  ComputeExponent,
  FormatNumericToString,
} from '@formatjs/ecma402-abstract'
import getInternalSlots from '@formatjs/intl-numberformat/src/get_internal_slots'

/**
 * @param {Intl.NumberFormat} nf
 * @param {number} value
 * @returns {number}
 */
function calculateRounded(nf, value) {
  const [exponent] = ComputeExponent(nf, value, { getInternalSlots })

  const numeric =
    exponent < 0
      ? value * Math.pow(10, -exponent)
      : value / Math.pow(10, exponent)

  const { roundedNumber } = FormatNumericToString(getInternalSlots(nf), numeric)

  return roundedNumber * Math.pow(10, exponent)
}

export class CompactNumber {
  /**
   * @param {Config} config
   * @param {Formatter} getNumberFormat
   * @param {Parameters<BaseFc<void>>} args
   */
  constructor(config, getNumberFormat, ...args) {
    const [value, options] = args

    /**
     * @private
     * @type {import('@formatjs/intl').OnErrorFn}
     */
    this._onError = config.onError

    try {
      /** @private */
      this._nf = getFormatter(config, getNumberFormat, {
        ...(options ?? {}),
        notation: 'compact',
      })
    } catch (e) {
      config.onError(
        new IntlError(
          IntlErrorCode.FORMAT_ERROR,
          'Error creating formatter for the compact number.',
          e
        )
      )
    }

    /**
     * @private
     * @type {number}
     */
    this._value = value
  }

  /**
   * @private
   * @type {string | undefined}
   */
  _formatted = undefined;

  /** @returns {string} The formatted string for the number. */
  [Symbol.toStringTag]() {
    if (this._formatted == null) {
      try {
        if (this._nf == null) {
          throw new Error('Formatter is not initialized')
        }

        this._formatted = this._nf.format(this._value)
      } catch (err) {
        this._onError(
          new IntlError(
            IntlErrorCode.FORMAT_ERROR,
            'Error formatting the compact number.',
            err
          )
        )

        this._formatted = String(this._value)
      }
    }
    return this._formatted
  }

  /**
   * @private
   * @type {number | undefined}
   */
  _rounded = undefined

  /** @returns {number} The rounded number. */
  valueOf() {
    if (this._rounded == null) {
      try {
        if (this._nf == null) {
          throw new Error('Formatter is not initialized')
        }

        this._rounded = calculateRounded(this._nf, this._value)
      } catch (err) {
        this._onError(
          new IntlError(
            IntlErrorCode.FORMAT_ERROR,
            'Error calculating the rounded number.',
            err
          )
        )

        this._rounded = this._value
      }
    }

    return this._rounded
  }

  /**
   * @private
   * @param {CompactNumber} instance
   * @param {Intl.NumberFormatPart[]} parts
   * @returns {CompactNumberParts}
   * @static
   */
  static _attachRoundedGetterToParts(instance, parts) {
    return /** @type {CompactNumberParts} */ (
      Object.defineProperty(parts, 'rounded', {
        configurable: true,
        writable: true,
        get() {
          return Number(instance)
        },
      })
    )
  }

  /**
   * @private
   * @type {CompactNumberParts | undefined}
   */
  _parts = undefined

  /** @returns {CompactNumberParts} The parts of the formatted number. */
  toParts() {
    if (this._parts == null) {
      try {
        if (this._nf == null) {
          throw new Error('Formatter is not initialized')
        }

        this._parts = CompactNumber._attachRoundedGetterToParts(
          this,
          this._nf.formatToParts(this._value)
        )
      } catch (err) {
        this._onError(
          new IntlError(
            IntlErrorCode.FORMAT_ERROR,
            'Error formatting the compact number.',
            err
          )
        )

        this._parts = CompactNumber._attachRoundedGetterToParts(this, [
          {
            type: 'literal',
            value: String(this._value),
          },
        ])
      }
    }

    return this._parts
  }

  /** Same as converting the class to the string. */
  get formatted() {
    return String(this)
  }

  /** Same as converting the class to the number. */
  get rounded() {
    return Number(this)
  }

  /**
   * Converts the {@link CompactNumber} to the one of primitive types based on
   * the provided hint.
   *
   * @template T
   * @param {T} hint Primitive conversion hint, either `"string"`, `"number"` or
   *   `"default"`.
   * @returns {T extends 'string' | 'default'
   *   ? string
   *   : T extends 'number'
   *   ? number
   *   : never}
   *   Based on the provided hint, either a number (representing rounded compact
   *   number) or a string (representing formatted value).
   * @throws {TypeError} If incorrect hint is provided, including no hint at
   *   all.
   */
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'default':
      case 'string':
        return /** @type {any} */ (this[Symbol.toStringTag]())
      case 'number':
        return /** @type {any} */ (this.valueOf())
      default:
        throw new TypeError(`Unknown hint: ${hint}`)
    }
  }
}

/**
 * @param {ConstructorParameters<typeof CompactNumber>} args
 * @returns {CompactNumber}
 */
export function formatCompactNumber(...args) {
  return new CompactNumber(...args)
}

/**
 * @param {ConstructorParameters<typeof CompactNumber>} args
 * @returns {CompactNumberParts}
 */
export function formatCompactNumberToParts(...args) {
  return formatCompactNumber(...args).toParts()
}

/**
 * @private
 * @typedef {Omit<import('@formatjs/intl').FormatNumberOptions, 'notation'>} Options
 */

/**
 * @template [R=void] Default is `void`
 * @typedef {(value: number, options?: Options) => R} BaseFc
 */

/** @typedef {import('@formatjs/intl').Formatters['getNumberFormat']} Formatter */

/** @typedef {Intl.NumberFormatPart[] & { rounded: number }} CompactNumberParts */

/** @typedef {BaseFc<CompactNumber>} CompactNumberFormatFunction */

/** @typedef {BaseFc<CompactNumberParts>} CompactNumberFormatToPartsFunction */

/**
 * @typedef {Object} Config
 * @property {string} locale
 * @property {import('@formatjs/intl').CustomFormats} formats
 * @property {import('@formatjs/intl').OnErrorFn} onError
 */
