// @ts-check

declare module '*.svg?inline' {
  import { SVGAttributes } from '@vue/runtime-dom'
  declare var component: import('vue').Component<
    never,
    never,
    never,
    SVGAttributes
  >
  export default component
}
