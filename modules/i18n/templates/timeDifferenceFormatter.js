// @ts-check

import { IntlError, IntlErrorCode } from '@formatjs/intl'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

/**
 * @typedef {object} IntervalMatcher
 * @property {number} ge Greater or equal constraint.
 * @property {number} divisor Divisor for calculating.
 * @property {Intl.RelativeTimeFormatUnitSingular} unit Matching unit.
 */

/** @type {IntervalMatcher[]} */
const intervals = [
  { ge: YEAR, divisor: YEAR, unit: 'year' },
  { ge: MONTH, divisor: MONTH, unit: 'month' },
  { ge: WEEK, divisor: WEEK, unit: 'week' },
  { ge: DAY, divisor: DAY, unit: 'day' },
  { ge: HOUR, divisor: HOUR, unit: 'hour' },
  { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
  { ge: 0, divisor: SECOND, unit: 'second' },
]

/**
 * Describes a union of types that can be used or converted to a timestamp.
 *
 * It must be either:
 *
 * - `string` which can be used to construct [`Date`]({@link Date}) object.
 * - `number` that contains a timestamp, a number of seconds since 1 Jan 1970 UTC.
 * - [`Date`]({@link Date}) object on which [`getTime`]({@link Date#getTime}) will
 *   be executed.
 *
 * @private
 * @typedef {Date | string | number} TimeRangePart
 */

/**
 * Describes a type of parameter that contains a time range. Can be either a
 * `from` date (as is or wrapped in an array), or both `from` and `to` dates
 * wrapped in an array. If `to` is not provided it is assumed to be the current
 * date at the moment of executing any function accepting this type.
 *
 * @typedef {| TimeRangePart
 *   | [from: TimeRangePart]
 *   | [from: TimeRangePart, to: TimeRangePart]} TimeRange
 */

/**
 * Converts provided {@link TimeRangePart} to an actual numeric timestamp.
 *
 * @param {TimeRangePart} value Value to convert.
 * @returns {number} Timestamp.
 */
function toTimestamp(value) {
  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === 'string') {
    return new Date(value).getTime()
  }

  return Number(value)
}

/**
 * Given relative time in seconds returns the largest unit available to display
 * it.
 *
 * @callback FormatTimeDifferenceFormatter
 * @param {TimeRange} range Range for which time difference is calculated.
 * @param {import('@formatjs/intl').FormatRelativeTimeOptions} [options]
 *   Options for relative time formatter.
 * @returns {string} Largest unit available to display the time.
 */

/** @typedef {Pick<import('@formatjs/intl').ResolvedIntlConfig, 'onError'>} Config */

/**
 * Given relative time in seconds returns the largest unit available to display
 * it.
 *
 * @param {Config} config IntlShape config.
 * @param {import('@formatjs/intl').IntlFormatters['formatRelativeTime']} format
 *   Formatter function.
 * @param {TimeRange} range Range for which time difference is calculated.
 * @param {import('@formatjs/intl').FormatRelativeTimeOptions} [options]
 *   Options for relative time formatter.
 * @returns {string} Largest unit available to display the time.
 */
export function formatTimeDifference(config, format, range, options) {
  /** @type {number} */
  let from

  /** @type {number} */
  let to

  if (Array.isArray(range)) {
    if (range.length <= 0 || range.length > 2) {
      config.onError(
        new IntlError(
          IntlErrorCode.FORMAT_ERROR,
          'Illegal TimeRange value passed'
        )
      )
    }

    from = toTimestamp(range[0] ?? 0)

    if (range.length > 1 && range[1] != null) {
      to = toTimestamp(range[1])
    } else {
      to = toTimestamp(new Date())
    }
  } else {
    from = toTimestamp(range)
    to = toTimestamp(new Date())
  }

  const diff = to - from
  const diffAbs = Math.abs(diff)

  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor)
      return format(diff < 0 ? x : -x, interval.unit, options)
    }
  }

  return String(diff)
}
