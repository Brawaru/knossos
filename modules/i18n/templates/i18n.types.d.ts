// @ts-check

/** @typedef {object} CustomMessageIDs */

import { MessageFormatElement } from '@formatjs/icu-messageformat-parser'

import {
  IntlController,
  IntlFormatAliases,
} from '~/modules/i18n/templates/i18n'

/**
 * Represents a custom map of messages, values don't matter and will be mapped
 * to descriptors regardless.
 *
 * By default it is empty, so all APIs of the module require only strings for
 * IDs. However, if this map is extended, then all APIs will require one of the
 * keys of this map as an ID, which makes it great for type checking.
 */
export interface CustomMessages {}

/**
 * Represents acceptable message IDs, this will be either string or key of
 * {@link CustomMessages} map if it's extended.
 */
export type MessageID = keyof CustomMessages extends never
  ? string
  : keyof CustomMessages

/**
 * Represents a message descriptor that uses acceptable messages IDs (see
 * {@link MessageID} and {@link CustomMessages}).
 */
export type MessageDescriptor<I = MessageID> = Omit<
  import('@formatjs/intl').MessageDescriptor,
  'id'
> & {
  id: I
}

export type AcceptableType =
  | import('vue').VNode
  | import('./compactNumber').CompactNumber

export type AnyArgument =
  | import('intl-messageformat').PrimitiveType
  | AcceptableType
  | import('intl-messageformat').FormatXMLElementFn<AcceptableType>

export type ValueArgument =
  | import('intl-messageformat').PrimitiveType
  | AcceptableType

export type RichArgument =
  import('intl-messageformat').FormatXMLElementFn<AcceptableType>

export type LiteralArgument = import('intl-messageformat').PrimitiveType

export type NumberArgument =
  | string
  | number
  | bigint
  | import('./compactNumber').CompactNumber

export type DateArgument = Date | string | number

export type StringArgument = string

type MessageFormatter =
  import('@formatjs/intl').IntlFormatters<AcceptableType>['formatMessage']

type NonUndefined<T> = T extends undefined ? never : T

/** Represents a record of values that can be used with translate function. */
export type InputValues = NonUndefined<Parameters<MessageFormatter>[1]>

export type MessageInputValues<C> = C extends never
  ? undefined
  : C extends object
  ? C
  : InputValues

/**
 * Represents a function that accepts translation ID, as well as values for the
 * placeholders inside the translation (if there are any).
 *
 * @param descriptor String ID or message descriptor.
 * @param values Values for the placeholders inside the translations.
 * @param opts
 * @returns Either formatted string (if all elements were strings) or array of
 *   formatted elements.
 */
export type TranslateFunction = <I extends MessageID>(
  descriptor: I | MessageDescriptor<I>,
  values: MessageInputValues<CustomMessages[I]>,
  opts?: Parameters<MessageFormatter>[1]
) => string

export type InjectionProperty = 'i18n' | 't' | 'fmt'

export type InjectionFunction = (
  property: InjectionProperty,
  value: IntlController | TranslateFunction | (() => IntlFormatAliases)
) => void

export type Message = string | MessageFormatElement[]

export type MessagesMap = {
  [K in MessageID]: Message
}

export type MessageDescriptorsMap = {
  [K in MessageID]: MessageDescriptor
}
