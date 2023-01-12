// @ts-check

import path from 'path'
import _glob from 'glob'
import { match as localeMatch } from '@formatjs/intl-localematcher'
import { scanLocaleDirectory } from './localeDir.mjs'
import { finalizePath, toPOSIX } from './paths.mjs'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'
import consola from 'consola'

const logging = consola.withScope('i18n-config-gen')

const glob = promisify(_glob)

// @ts-expect-error TypeScript being stupid and not reconising we are in module JS.
const require = createRequire(import.meta.url)

const memo = require('lodash/memoize')

/**
 * @typedef {Omit<
 *   Partial<import('~/modules/i18n').Options>,
 *   'defaultLocale' | 'locales'
 * >} ConfigDefaults
 */

/** @typedef {boolean | 'verbose' | undefined} LoggingOption */

/**
 * @typedef {object} GeneratorOptions
 * @property {string} defaultLocale Default locale code.
 * @property {string} localesDir Directory that contains the directories with
 *   locale files.
 * @property {string[]} [acceptedLocales] If set, only locales listed within the
 *   array will be exported.
 * @property {string} [srcDir] Directory where app is built from. If omitted,
 *   all imports will be set to absolute paths.
 * @property {ConfigDefaults} [defaults] Defaults for the config.
 * @property {LoggingOption} [logging] Whether to log generator actions.
 */

/**
 * @template T
 * @typedef {T extends undefined ? never : T extends null ? never : T} Provided
 */

/**
 * Represents an Intl.NumberFormat data resolver that takes in BCP 47 locale tag
 * and searches for data file associated with that locale, if there is no data
 * file that matches the locale, then `null` is returned. That data must be
 * additionally imported with the locale files so that polyfilled
 * Intl.NumberFormat propertly works.
 *
 * @callback NumberFormatDataResolver
 * @param {string} code BCP 47 locale code that needs resolving.
 * @returns {string | null} Path
 */

/**
 * @param {LoggingOption} logs
 * @returns {Promise<NumberFormatDataResolver>} A resolver for polyfilled
 *   Intl.NumberFormat locale data. The return value is memoized and can be
 *   called multiple times without performance drawbacks.
 */
async function createNumberFormatDataResolver(logs) {
  const logger = logging.withTag('resolver')

  const numberFormatDir = toPOSIX(
    path.relative(
      process.cwd(),
      path.dirname(require.resolve('@formatjs/intl-numberformat'))
    )
  )

  if (logs === 'verbose') {
    logger.info(`Sourcing numberFormat data from ${numberFormatDir}`)
  }

  const localeDataFiles = await glob(`${numberFormatDir}/locale-data/*.js`, {
    nodir: true,
  })

  const supportedLocales = localeDataFiles.map((it) => path.basename(it, '.js'))

  /** @param {string} code BCP 47 locale code to search locale data for. */
  function resolver(code) {
    const match = localeMatch([code], supportedLocales, 'en-US-x-placeholder')

    if (match === 'en-US-x-placeholder') {
      if (logs === true) {
        logger.warn(`Missing NumberFormat data for locale ${code}`)
      }

      return null
    }

    const importPath = `@formatjs/intl-numberformat/locale-data/${match}.js`

    if (logs === 'verbose') {
      logger.log(
        `Sourcing NumberFormat data for locale "${code}" from "${importPath}"`
      )
    }

    return importPath
  }

  return resolver
}

/**
 * Generates config from the locale directory
 *
 * @param {string} dirPath Path to the locale directory.
 * @param {NumberFormatDataResolver} getNumberFormatDataImport Active resolver
 *   for NumberFormat data.
 * @param {string} [srcDirPath] Path to the source directory.
 * @returns {Promise<import('modules/i18n').LocaleDescriptor>} Locale descriptor
 *   for the provided path.
 */
async function createDescriptorForLocaleDir(
  dirPath,
  getNumberFormatDataImport,
  srcDirPath
) {
  const code = path.basename(dirPath)
  const localeDir = await scanLocaleDirectory(dirPath)

  if (localeDir.sourceFile == null) {
    throw new Error(`Locale directory is missing source file: ${localeDir}`)
  }

  /**
   * @type {Provided<
   *   import('modules/i18n').LocaleDescriptor['importedData']
   * >}
   */
  const importedData = Object.create(null)

  for (const [resourceName, resourcePath] of Object.entries(
    localeDir.additionalResources
  )) {
    importedData[resourceName] = finalizePath(resourcePath, srcDirPath)
  }

  /**
   * @type {Provided<
   *   import('modules/i18n').LocaleDescriptor['additionalImports']
   * >}
   */
  const additionalImports = []

  {
    const dataImport = getNumberFormatDataImport(code)

    if (dataImport != null) {
      additionalImports.push(dataImport)
    }
  }

  return {
    code,
    file: finalizePath(localeDir.sourceFile, srcDirPath),
    additionalImports,
    importedData,
    data: (await localeDir.parseMetaFile())?.getContents(),
  }
}

/**
 * Generates the configuration using the provided options.
 *
 * @param {GeneratorOptions} opts Generator options.
 */
export async function generateConfig(opts) {
  const { localesDir, defaultLocale, srcDir } = opts

  /** @type {import('modules/i18n').LocaleDescriptor[]} */
  const locales = []

  const nfResolver = await createNumberFormatDataResolver(opts.logging)

  for (const _localeDirBase of await glob(`*/`, { cwd: localesDir })) {
    const localeDir = path.join(localesDir, _localeDirBase)

    /** @type {import('~/modules/i18n').LocaleDescriptor} */
    let descriptor

    try {
      descriptor = await createDescriptorForLocaleDir(
        localeDir,
        nfResolver,
        opts.srcDir
      )
    } catch (err) {
      throw new Error(`Cannot create descriptor for locale: "${localeDir}"`, {
        cause: err,
      })
    }

    if (
      descriptor.code === opts.defaultLocale ||
      (opts.acceptedLocales?.includes(descriptor.code) ?? true)
    ) {
      locales.push(descriptor)
    }
  }

  if (opts.logging) {
    logging.success(
      `Discovered locales: ${locales.map((_) => _.code).join(', ')}`
    )
  }

  return {
    _comment:
      'This file is generated automatically. Use `bin/i18n-config-gen.mjs` script to re-generate it.',
    ...opts.defaults,
    defaultLocale,
    locales,
  }
}
