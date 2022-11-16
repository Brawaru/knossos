// @ts-check

// FIXME: if migrating to TS, these should be gathered from API spec

/** @typedef {'mod' | 'modpack' | 'resourcepack' | 'plugin'} ProjectType */

/** @typedef {'required' | 'optional' | 'unsupported'} SideRequirement */

/**
 * @typedef {object} Project
 * @property {ProjectType} project_type Type of the project.
 * @property {SideRequirement} client_side Project requirement for the client
 *   side.
 * @property {SideRequirement} server_side Project requirement for the server
 *   side.
 */

/** @typedef {'universal' | 'server' | 'client' | 'unknown'} ProjectSide */

/**
 * By checking project side requirements determines which side the project must
 * be present at.
 *
 * This helper function should be defined as `$computeProjectSide` in both Vue
 * and Nuxt's Context types.
 *
 * @param {SideRequirement} clientSide Project's requirement for client.
 * @param {SideRequirement} serverSide Project's requirement for server.
 * @returns {ProjectSide} Project side.
 */
function computeProjectSide(clientSide, serverSide) {
  if (clientSide === 'optional' && serverSide === 'optional') {
    return 'universal'
  }

  if (
    (clientSide === 'optional' || clientSide === 'required') &&
    (serverSide === 'optional' || serverSide === 'unsupported')
  ) {
    return 'client'
  }

  if (
    (serverSide === 'optional' || serverSide === 'required') &&
    (clientSide === 'optional' || clientSide === 'unsupported')
  ) {
    return 'server'
  }

  return 'unknown'
}

/**
 * Represents a computed type of the project (whether it's a mod, plugin or a
 * mix of both).
 *
 * @typedef {'mod' | 'plugin' | 'mixed'} ProjectTypeDisplayType
 */

/**
 * @typedef {object} ProjectTypeDisplay
 * @property {string | null} sideTip Localised side tip (project side + project
 *   type).
 * @property {string} projectType Localised project type.
 */

/** @typedef {ProjectType | 'mod-and-plugin'} CoercedProjectType */

/**
 * Coerces project type if the project is of mod type, but has along its loaders
 * any plugin loaders, in which case it's coerced to `mod-and-plugin` type.
 *
 * This helper function should be defined as `$coerceProjectType` on both Vue
 * and Nuxt Context types.
 *
 * @param {ProjectType} projectType Regular project type taken from
 *   `project_type` property of project object.
 * @param {string[]} loaders Identifiers of all loaders found by going through
 *   all of the project's versions.
 * @returns {CoercedProjectType} Coerced project type.
 * @this {import('@nuxt/types').Context}
 */
function coerceProjectType(projectType, loaders) {
  if (projectType !== 'mod') {
    return projectType
  }

  const isPlugin = loaders.some((loader) =>
    this.store.state.tag.loaderData.allPluginLoaders.includes(loader)
  )

  const isMod = loaders.some((loader) =>
    this.store.state.tag.loaderData.modLoaders.includes(loader)
  )

  if (isPlugin && isMod) {
    return 'mod-and-plugin'
  } else if (isPlugin) {
    return 'plugin'
  }

  return 'mod'
}

/** @typedef {'plugin' | 'resourcepack'} NonDisplayType */

/** @type {CoercedProjectType[]} */
const excludedSideTipTypes = /** @type {NonDisplayType[]} */ ([
  'plugin',
  'resourcepack',
])

/**
 * @param {CoercedProjectType} value Side type.
 * @returns {value is NonDisplayType}
 */
function isExcludedSideType(value) {
  return excludedSideTipTypes.includes(value)
}

/**
 * Computes whether project type must be displayed and if so, provides localised
 * title that can be displayed.
 *
 * This helper function should be defined as `$computedProjectTypeDisplay` on
 * both Vue and Nuxt's Context types.
 *
 * @param {ProjectSide} side Earlier computed project side using
 *   {@link computeProjectSide}.
 * @param {CoercedProjectType} type Coerced using {@link coerceProjectType}
 *   function project type.
 * @returns {string | null} Project side tip or `null` if it should not be
 *   displayed.
 * @this {import('@nuxt/types').Context}
 */
function computeProjectTypeDisplay(side, type) {
  if (side === 'unknown' || isExcludedSideType(type)) {
    return null
  }

  let id = /** @type {const} */ (`project-type-display.${type}`)

  return this.$t(id, { side })
}

/**
 * Provides localised category name.
 *
 * @param {string} categoryName Original category name provided by the API.
 * @returns {string} Localised category name.
 * @this {import('@nuxt/types').Context}
 */
function translateCategory(categoryName) {
  /** @type {string} */
  let normalizedKey

  switch (categoryName) {
    case '512x+': {
      normalizedKey = '512x-or-higher'
      break
    }
    case '8x-': {
      normalizedKey = '8x-or-lower'
      break
    }
    default: {
      normalizedKey = categoryName
    }
  }

  normalizedKey = normalizedKey.replace(/_/g, '-')

  return this.$t(/** @type {any} */ (`category.${normalizedKey}`))
}

/**
 * Provides localised loader name.
 *
 * @param {string} loaderName Original loader name provided by the API.
 * @returns {string} Localised loader name.
 * @this {import('@nuxt/types').Context}
 */
function translateLoader(loaderName) {
  return this.$t(/** @type {any} */ (`loader.${loaderName}`))
}

/**
 * Provides localised name for a project type.
 *
 * @param {ProjectType} projectType Project type to localise.
 * @param {boolean} [plural=false] Whether to use plural. Default is `false`
 * @returns {string} Localised name for the project type.
 * @this {import('@nuxt/types').Context}
 */
function translateProjectType(projectType, plural = false) {
  return this.$t(
    `project-type.${projectType}.${plural ? 'plural' : 'singular'}`
  )
}

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
  delete o['bytesUnitDisplay']
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

  const i = Math.floor(Math.log(bytes) / Math.log(kibibyte))

  let sel = sizes[i]
  if (sel == null) sel = 'bytes'

  return this.$t(`unit.size.${sel}.${options.unitDisplay ?? 'short'}`, {
    value: this.$fmt.compactNumber(
      bytes / Math.pow(kibibyte, i),
      numberFormatOptions(options)
    ),
  })
}

/**
 * @typedef {object} DefinedHelpers
 * @property {typeof computeProjectSide} $computeProjectSide
 * @property {typeof coerceProjectType} $coerceProjectType
 * @property {typeof computeProjectTypeDisplay} $computeProjectTypeDisplay
 * @property {typeof translateCategory} $translateCategory
 * @property {typeof translateLoader} $translateLoader
 * @property {typeof translateProjectType} $translateProjectType
 * @property {typeof formatFileSize} $formatFileSize
 */

/** @type {import('@nuxt/types').Plugin} */
export default (ctx, inject) => {
  inject('computeProjectSide', computeProjectSide)
  inject('coerceProjectType', coerceProjectType.bind(ctx))
  inject('computeProjectTypeDisplay', computeProjectTypeDisplay.bind(ctx))
  inject('translateCategory', translateCategory.bind(ctx))
  inject('translateLoader', translateLoader.bind(ctx))
  inject('translateProjectType', translateProjectType.bind(ctx))
  inject('formatFileSize', formatFileSize.bind(ctx))
}
