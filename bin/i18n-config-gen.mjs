#!/usr/bin/env node

// @ts-check

import consola from 'consola'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateConfig } from './i18n/configGenerator.mjs'
import { formatterFor } from './i18n/prettier.mjs'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let parser = yargs(hideBin(process.argv))
  .scriptName('i18n-config-gen')
  .usage('$0', 'generate i18n configuration for knossos')
  .option('output', {
    describe: 'Output path where the configuration file will be written to',
    alias: 'o',
    default: './generated/i18n-config.json',
    type: 'string',
  })
  .option('locales-dir', {
    describe:
      'Directory where the locale files are located. If relative, resolved against src-dir',
    default: './i18n',
    type: 'string',
  })
  .option('default-locale', {
    describe: 'Locale to use as default',
    type: 'string',
    default: 'en-US',
  })
  .option('src-dir', {
    describe: 'Directory containing source files for the app',
    type: 'string',
    default: '.',
  })
  .option('active-locales-file', {
    description:
      'Path to a file which contains an array of locale names. If not provided, all locales are exported.',
    alias: 'r',
    type: 'string',
  })

parser = parser.wrap(parser.terminalWidth())

async function runProgram() {
  const argv = await parser.parse()

  const srcDir = path.resolve(process.cwd(), argv.srcDir)
  const outFile = path.resolve(process.cwd(), argv.output)

  /** @type {string[] | undefined} */
  let acceptedLocales

  if (argv.activeLocalesFile) {
    const activeLocales = await fs
      .readFile(path.resolve(srcDir, argv.activeLocalesFile), {
        encoding: 'utf8',
      })
      .then((contents) => JSON.parse(contents))

    const invariant = () => {
      throw new Error(
        'Malformed accepted locales file: root object was supposed to be an array of strings'
      )
    }

    if (!Array.isArray(activeLocales)) invariant()

    acceptedLocales = []

    /** @type {string[]} */
    let warnings = []

    for (const locale of activeLocales) {
      if (typeof locale !== 'string') invariant()

      if (acceptedLocales.includes(locale)) {
        warnings.push(
          `Accepted locales file lists locale "${locale}" several times`
        )

        continue
      }

      acceptedLocales.push(locale)
    }

    for (const warning of warnings) consola.warn(warning)
  }

  const config = await generateConfig({
    defaultLocale: argv.defaultLocale,
    localesDir: path.resolve(srcDir, argv.localesDir),
    srcDir,
    acceptedLocales,
    logging: true,
  })

  const format = await formatterFor(outFile)
  const contents = format(JSON.stringify(config, null, 2))

  await fs.writeFile(outFile, contents, { encoding: 'utf-8' })

  consola.success('Generated new configuration at %s', outFile)
}

runProgram().then(
  () => process.exit(0),
  (err) => {
    consola.fatal('Cannot generate configuration:', err)
    process.exit(1)
  }
)
