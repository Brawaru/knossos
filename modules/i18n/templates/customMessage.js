// @ts-check

import { IntlError, IntlErrorCode } from '@formatjs/intl'

/**
 * @private
 * @typedef {import('@formatjs/intl').Formatters['getMessageFormat']} Formatter
 */

/**
 * @typedef {object} Config
 * @property {string} locale
 * @property {import('@formatjs/intl').Formatters} formatters
 * @property {import('@formatjs/intl').CustomFormats} formats
 * @property {import('@formatjs/intl').OnErrorFn} onError
 */

/**
 * @param {Config} config Intl config.
 * @param {Parameters<Formatter>[0]} message Message to format.
 * @param {Parameters<ReturnType<Formatter>['format']>[0]} [values] Values to
 *   format message with.
 * @param {Parameters<Formatter>[3]} [opts] Custom formatter options.
 * @returns {any | ''} Formatted message or empty string if it cannot be
 *   formatted.
 */
export function formatCustomMessage(config, message, values, opts) {
  const { getMessageFormat } = config.formatters
  try {
    return getMessageFormat(
      message,
      config.locale,
      config.formats,
      opts
    ).format(values)
  } catch (err) {
    let messageSlice

    if (typeof message === 'string') {
      messageSlice = message.slice(0, 20)

      if (message.length > 20) {
        messageSlice += '...'
      }
    } else {
      messageSlice = '<compiled message>'
    }

    config.onError(
      new IntlError(
        IntlErrorCode.FORMAT_ERROR,
        `Error formatting custom message "${messageSlice}".`,
        err
      )
    )
  }

  return ''
}

/**
 * @callback CustomMessageFormatter
 * @param {Parameters<Formatter>[0]} message Message to format.
 * @param {Parameters<ReturnType<Formatter>['format']>[0]} [values] Values to
 *   format message with.
 * @param {Parameters<Formatter>[3]} [opts] Custom formatter options.
 * @returns {any | ''} Formatted message or empty string if it cannot be
 *   formatted.
 */
