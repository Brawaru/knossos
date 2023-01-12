/**
 * Checks whether the provided object has the required property.
 *
 * @param {Object} instance Object which property is checked.
 * @param {string | symbol} prop Name of the property to check.
 * @returns {boolean} Whether the object has the required property.
 */
export const hasOwn = (instance, prop) =>
  Object.prototype.hasOwnProperty.call(instance, prop)

/**
 * Parses `Accept-Language` header value and returns locale sorted by their
 * qualities.
 *
 * @param {string} header Accept-Language header value.
 * @returns {[locale: string, quality: number][]} List of requested locales
 *   with their qualities, sorted by their quality
 */
export function parseAcceptLanguageHeader(header) {
  // given: en-GB;q=1,en-US;q=0.9;ru-RU

  /** @type {[locale: string, quality: number][]} */
  let locales = []

  const values = header.split(',').map((it) => it.trim())

  for (const value of values) {
    const [locale, ...configurations] = value.split(';')

    let quality = 1.0

    for (const configuration of configurations) {
      let [key, value] = configuration.split('=')
      key = key.trim()
      value = value?.trim() ?? null

      if (value == null || value == '') continue

      if (key === 'q') {
        const floatValue = parseFloat(value)
        if (!isNaN(floatValue)) {
          quality = floatValue
        }
      }
    }

    locales.push([locale, quality])
  }

  return locales.sort((a, b) => b[1] - a[1])
}
