import { generateConfig } from './configGenerator.mjs'

/**
 * @typedef {Omit<
 *   import('./configGenerator.mjs').GeneratorOptions,
 *   'defaults'
 * > &
 *   Required<
 *     Pick<import('./configGenerator.mjs').GeneratorOptions, 'defaults'>
 *   >} Options
 */

/** @param {Options} opts */
export default function load(opts) {
  return () => generateConfig(opts)
}
