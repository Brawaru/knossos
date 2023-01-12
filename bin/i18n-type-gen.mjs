// @ts-check

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import consola from 'consola'
import path from 'node:path'
import fs from 'node:fs/promises'
import { scanLocaleDirectory } from './i18n/localeDir.mjs'
import { formatterFor } from './i18n/prettier.mjs'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { finalizePath } from './i18n/paths.mjs'
import messageParser from '@formatjs/icu-messageformat-parser'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @ts-ignore
const require = createRequire(import.meta.url)

const t = require('lodash/template')

let parser = yargs(hideBin(process.argv))
  .scriptName('i18n-type-gen')
  .usage('$0', 'generate i18n types')
  .option('output', {
    describe: 'Output path where the configuration file will be written to',
    alias: 'o',
    default: './types/i18n-messages.d.ts',
    type: 'string',
  })
  .option('default-locale-dir', {
    alias: 'i',
    describe:
      'Directory where the locale files are located. If relative, resolved against the src-dir',
    default: './i18n/en-US',
    type: 'string',
  })
  .option('src-dir', {
    alias: 's',
    describe: 'Directory containing source files for the app',
    type: 'string',
    default: '.',
  })
  .option('watch', {
    alias: 'w',
    describe: 'Whether to run the script in watch mode',
    type: 'boolean',
    default: false,
  })

parser = parser.wrap(parser.terminalWidth())

class ArgumentType {
  /** @param {string | null} exportName Name of the export from types file. */
  constructor(exportName) {
    /**
     * @private
     * @type {string | null}
     */
    this._exportName = exportName
  }

  /** Name of the export from types file. */
  get exportName() {
    return this._exportName
  }

  toString() {
    return this._exportName
  }
}

class SimpleArgumentType extends ArgumentType {
  /** @param {string} type Type of this element when exporting to TypeScript. */
  constructor(type) {
    super(type)
  }
}

class AnyArgumentType extends SimpleArgumentType {
  constructor() {
    super('AnyArgument')
  }
}

class ValueArgumentType extends SimpleArgumentType {
  constructor() {
    super('ValueArgument')
  }
}

class RichArgumentType extends SimpleArgumentType {
  constructor() {
    super('RichArgument')
  }
}

class SelectArgumentType extends ArgumentType {
  constructor() {
    super('SelectArgument')
  }

  /**
   * All the choices that will be used to shape the type.
   *
   * @type {Set<string>}
   */
  choices = new Set()

  /**
   * Takes multiple instances of {@link SelectArgumentType} and combines them
   * into a new instance.
   *
   * @param {...SelectArgumentType} args Select argument types to merge.
   * @returns A new instance that contains all the choices of the other
   *   instances.
   */
  static merged(...args) {
    const merged = new SelectArgumentType()

    for (const arg of args) {
      for (const choice of arg.choices) {
        merged.choices.add(choice)
      }
    }

    return merged
  }

  toString() {
    const keywordsUnion = Array.from(this.choices)
      .map((choice) => JSON.stringify(choice))
      .join(' | ')

    return `${this.exportName}<${keywordsUnion}>`
  }
}

/**
 * @param {ArgumentType} arg1 First argument type.
 * @param {ArgumentType} arg2 Second argument type.
 */
function argumentTypesEqual(arg1, arg2) {
  if (
    arg1 instanceof SelectArgumentType &&
    arg2 instanceof SelectArgumentType
  ) {
    if (arg1.choices.size !== arg2.choices.size) {
      return false
    }

    for (const choice of arg1.choices) {
      if (!arg2.choices.has(choice)) {
        return false
      }
    }

    return true
  }

  return arg1.exportName === arg2.exportName
}

class DateArgumentType extends SimpleArgumentType {
  constructor() {
    super('DateArgument')
  }
}

class NumberArgumentType extends SimpleArgumentType {
  constructor() {
    super('NumberArgument')
  }
}

/** @typedef {Map<string, ArgumentType>} ArgumentsMap */

/**
 * @param {string} messageId ID of the message (used for diagnostics).
 * @param {string} message Message itself.
 * @returns {ArgumentsMap} Element names mapped to their TypeScript types.
 */
function gatherElements(messageId, message) {
  /** @type {ArgumentsMap} */
  const m = new Map()

  /**
   * Checks whether the argument is already present in the
   *
   * @param {string} name Name of the argument.
   * @param {ArgumentType} newType Type of the argument.
   */
  function addOrFixType(name, newType) {
    const existingType = m.get(name)

    if (existingType == null) {
      m.set(name, newType)

      return
    } else if (argumentTypesEqual(existingType, newType)) {
      return
    }

    if (
      existingType instanceof NumberArgumentType &&
      newType instanceof ValueArgumentType
    ) {
      return // already satisfied
    }

    if (
      existingType instanceof ValueArgumentType &&
      newType instanceof NumberArgumentType
    ) {
      consola.info(
        `[${messageId}] Reducing type of argument "${name}" to number based on usage`
      )

      m.set(name, newType)

      return
    }

    if (
      existingType instanceof ValueArgumentType &&
      newType instanceof SelectArgumentType
    ) {
      m.set(name, newType)

      return
    }

    if (
      existingType instanceof SelectArgumentType &&
      newType instanceof ValueArgumentType
    ) {
      return // already satisfied
    }

    if (
      existingType instanceof SelectArgumentType &&
      newType instanceof SelectArgumentType
    ) {
      consola.info(
        `[${messageId}] Merging ${String(existingType)} with ${String(newType)}`
      )
      m.set(name, SelectArgumentType.merged(existingType, newType))
      return
    }

    m.set(name, new AnyArgumentType())

    consola.warn(
      `[${messageId}] Cannot infer type of argument "${name}" based on usage, it's widened to accept any valid value`
    )

    return
  }

  /**
   * Recursively processes the elements and adds them to a map.
   *
   * @param {import('@formatjs/icu-messageformat-parser').MessageFormatElement[]} elements
   */
  function processElements(elements) {
    for (const element of elements) {
      if (
        messageParser.isLiteralElement(element) ||
        messageParser.isPoundElement(element)
      ) {
        continue
      } else if (messageParser.isArgumentElement(element)) {
        addOrFixType(element.value, new ValueArgumentType())
      } else if (
        messageParser.isDateElement(element) ||
        messageParser.isTimeElement(element)
      ) {
        addOrFixType(element.value, new DateArgumentType())
      } else if (messageParser.isNumberElement(element)) {
        addOrFixType(element.value, new NumberArgumentType())
      } else if (messageParser.isPluralElement(element)) {
        addOrFixType(element.value, new NumberArgumentType())

        for (const { value } of Object.values(element.options)) {
          processElements(value)
        }
      } else if (messageParser.isSelectElement(element)) {
        const argumentType = new SelectArgumentType()

        for (const [key, { value }] of Object.entries(element.options)) {
          argumentType.choices.add(key)
          processElements(value)
        }

        addOrFixType(element.value, argumentType)
      } else if (messageParser.isTagElement(element)) {
        addOrFixType(element.value, new RichArgumentType())

        processElements(element.children)
      }
    }
  }

  try {
    processElements(messageParser.parse(message))
  } catch (err) {
    consola.warn(`Could not process string with key "${messageId}":`, err)

    return new Map()
  }

  return m
}

/**
 * @private
 * @typedef {object} Message
 * @property {string} id Unique message identifier.
 * @property {ArgumentsMap} args Argument types for the string.
 */

/**
 * Map of message loaders (function that accept file contents and return the
 * messages).
 *
 * @type {Record<string, (contents: string) => Promise<Message[]>>}
 */
const loaders = {
  async '.toml'(contents) {
    const TOML = await import('@ltd/j-toml')
    const { flatten } = require('flat')

    const table = TOML.parse(contents, { joiner: '\n' })

    const flattened = /** @type {Record<string, string>} */ (
      flatten(table, { delimiter: '.' })
    )

    return Object.entries(flattened).map(([id, message]) => {
      return {
        id,
        args: gatherElements(id, message),
      }
    })
  },
}

/**
 * @param {string} filePath Path to the file from which messages should be
 *   loaded.
 */
async function loadMessages(filePath) {
  const ext = path.extname(filePath)

  if (!Object.prototype.hasOwnProperty.call(loaders, ext)) {
    throw new Error(`There is no loader for "${ext}" file format`)
  }

  return loaders[ext](await fs.readFile(filePath, { encoding: 'utf8' }))
}

/**
 * @typedef {object} GenerationContext
 * @property {string[] | null} argumentTypeImports Types that have to improted
 *   for argument type checking.
 * @property {Message[]} messages Messages to generate contents from.
 * @property {string} sourcePath Path to the source locale directory.
 * @property {string} metaFilePath Finalised path to meta file.
 * @property {[name: string, type: string][]} additionalResources Additional
 *   resources that will be auto-loaded.
 */

const messageElement = `import('@formatjs/icu-messageformat-parser').MessageFormatElement[]`

const dataTypes = {
  '.md': messageElement,
  '.html': messageElement,
  /**
   * @param {string} resource Resource for which the function is called.
   * @param {import('./i18n/localeDir.mjs').LocaleDirectory} localeDir Locale
   *   directory.
   * @param {string} [srcDir] Source directory where the file is located.
   */
  '.json'(resource, localeDir, srcDir) {
    return `typeof import(${JSON.stringify(
      finalizePath(path.join(localeDir.path, resource), srcDir)
    )})`
  },
}

const template = `// This file is generated automatically from <%= sourcePath %>
// Use bin/i18n-type-gen.mjs script to re-generate it.

import '~/modules/i18n/templates/i18n'
<% if (argumentTypeImports != null && argumentTypeImports.length > 0) { %>
import { <%= argumentTypeImports.join(', ') %> } from '~/modules/i18n/templates/i18n.types'
<% } %>
declare module '~/modules/i18n/templates/i18n.types' {
  interface CustomMessages {
    <% messages.forEach(function typeMessage(message) { %>
    <%= JSON.stringify(message.id) %>: <% if (message.args.size === 0) { print('never'); } else { %>{
      <% message.args.forEach(function typeArgument(type, name) { %><%= JSON.stringify(name) %>: <%= type.toString() %>
    <% }) %>
    }<% } %>
    <% }); %>
  }
}

type DechromifiedMeta<T = typeof import(<%= JSON.stringify(metaFilePath) %>)> = {
  [K in keyof T]: T[K] extends { message: string } ? T[K]['message'] : never
}

declare module '~/modules/i18n/templates/types' {
  interface LocaleData extends DechromifiedMeta {}

  interface LocaleImportedData {
    <% forEach(additionalResources, (resource) => { %>
    <%= JSON.stringify(resource[0]) %>: <%= resource[1] %>
    <% }); %>
  }
}`

/**
 * Generates contents for the ambient type definitions file using the
 * {@link template}.
 *
 * @param {GenerationContext} ctx Context used for generation.
 * @returns {string} Contents of the type definitions file.
 */
export function generateTypedefFileContents(ctx) {
  return t(template, {
    imports: {
      JSON,
      /**
       * Iterates over array.
       *
       * @template T
       * @param {T[]} values Array with values to iterate over.
       * @param {(value: T, index: number, arr: T[]) => void} fc Function to
       *   call on each value of array.
       */
      forEach(values, fc) {
        if (!Array.isArray(values)) {
          throw new Error('Trying to iterate over a non-array')
        }

        for (let i = 0, l = values.length; i < l; i++) {
          fc.call(undefined, values[i], i, values)
        }
      },
    },
  })(ctx)
}

/**
 * @template O
 * @param {O} obj Object which own property should be checked.
 * @param {string} property Key to check.
 * @returns {property is keyof O}
 */
function hasKey(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property)
}

/**
 * @param {import('./i18n/localeDir.mjs').LocaleDirectory} localeDir Locale
 *   directory.
 * @param {string} [srcDir] Source files directory for path finalization.
 * @returns {Promise<GenerationContext>}
 */
async function contextForDirectoryState(localeDir, srcDir) {
  if (localeDir.sourceFile == null) {
    throw new Error(`Cannot find locale source file in "${localeDir.path}"`)
  }

  if (localeDir.metaFile == null) {
    throw new Error(`Cannot find locale meta file in "${localeDir.path}"`)
  }

  const messages = await loadMessages(localeDir.sourceFile)

  /** @type {GenerationContext['additionalResources']} */
  const resources = []

  for (const resource of Object.keys(localeDir.additionalResources)) {
    let type = 'unknown'

    const ext = path.extname(resource)

    if (hasKey(dataTypes, ext)) {
      const typer = dataTypes[ext]
      type =
        typeof typer === 'string' ? typer : typer(resource, localeDir, srcDir)
    } else {
      consola.warn(
        `Unknown file extension "${ext}", resource "${resource}" is mapped to "unknown" type`
      )
    }

    resources.push([resource, type])
  }

  /** @type {Set<string>} */
  const argumentTypeImports = new Set()

  for (const { args } of messages) {
    for (const type of args.values()) {
      if (type.exportName != null) {
        argumentTypeImports.add(type.exportName)
      }
    }
  }

  return {
    messages,
    sourcePath: finalizePath(localeDir.path, srcDir),
    additionalResources: resources,
    metaFilePath: finalizePath(localeDir.metaFile, srcDir),
    argumentTypeImports: [...argumentTypeImports],
  }
}

/**
 * @template [V=void] Default is `void`
 * @returns {{
 *   promise: Promise<V>
 *   resolve: (value: V) => void
 *   reject: (reason?: any) => void
 * }}
 */
function defer() {
  /** @type {any} */
  let resolve = undefined

  /** @type {any} */
  let reject = undefined

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return { promise, resolve, reject }
}

async function runProgram() {
  const argv = await parser.parse()

  const outFilePath = path.resolve(process.cwd(), argv.output)
  const srcPath = path.resolve(process.cwd(), argv.srcDir)

  const localeDirPath = path.resolve(srcPath, argv.defaultLocaleDir)

  async function runOnce() {
    const localeDir = await scanLocaleDirectory(localeDirPath)

    const context = await contextForDirectoryState(localeDir, srcPath)

    const content = generateTypedefFileContents(context)

    const format = await formatterFor(outFilePath)
    const contents = format(content)

    {
      const parentFolder = path.dirname(outFilePath)

      await fs.mkdir(parentFolder, { recursive: true })
    }

    await fs.writeFile(outFilePath, contents, { encoding: 'utf-8' })
  }

  if (argv.watch) {
    const { watch } = await import('chokidar')

    const { promise: watchingComplete, resolve: markAsComplete } = defer()

    const watcher = watch(localeDirPath)

    let ready = false

    /**
     * @param {string} path Changed path
     * @param {boolean} [initial] Default is `false`
     */
    function refresh(path, initial = false) {
      if (!ready) return

      if (initial) {
        consola.log('Watching for new changes...')
      } else {
        console.info('Changes detected, re-generating definitions file')
      }

      runOnce()
        .then(() => {
          if (initial) {
            consola.success('Generated definitions file')
          } else {
            consola.success('Re-generated definitions file')
          }
        })
        .catch((err) => {
          if (initial) {
            consola.error('Cannot generate new definitions:', err)
          } else {
            consola.error('Cannot generate definitions file:', err)
          }
        })
    }

    watcher.on('change', (path) => refresh(path))
    watcher.on('add', (path) => refresh(path))
    watcher.on('unlink', (path) => refresh(path))
    watcher.on('ready', () => {
      ready = true
      refresh(localeDirPath, true)
    })

    watcher.on('close', () => markAsComplete())

    process.on('SIGINT', () => {
      consola.info('Stopping watching...')
      watcher.close()
    })

    await watchingComplete
  } else {
    await runOnce()

    consola.success(`Generated new definitions file at "${outFilePath}"`)
  }
}

runProgram().then(
  () => process.exit(0),
  (err) => {
    consola.fatal('Cannot generate definitions file:', err)
    process.exit(1)
  }
)
