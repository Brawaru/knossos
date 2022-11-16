// This file is generated automatically from ~/i18n/en-US
// Use bin/i18n-type-gen.mjs script to re-generate it.

import '~/modules/i18n/templates/i18n'

import {
  RichArgument,
  ValueArgument,
  NumberArgument,
} from '~/modules/i18n/templates/i18n.types'

declare module '~/modules/i18n/templates/i18n.types' {
  interface CustomMessages {
    'ads.exaroton': {
      strong: RichArgument
    }

    'category.128x': never

    'category.16x': never

    'category.256x': never

    'category.32x': never

    'category.512x-or-higher': never

    'category.64x': never

    'category.8x-or-lower': never

    'category.adventure': never

    'category.audio': never

    'category.blocks': never

    'category.challenging': never

    'category.combat': never

    'category.core-shaders': never

    'category.cursed': never

    'category.decoration': never

    'category.economy': never

    'category.entities': never

    'category.environment': never

    'category.equipment': never

    'category.fonts': never

    'category.food': never

    'category.game-mechanics': never

    'category.gui': never

    'category.items': never

    'category.kitchen-sink': never

    'category.library': never

    'category.lightweight': never

    'category.locale': never

    'category.magic': never

    'category.management': never

    'category.minigame': never

    'category.mobs': never

    'category.modded': never

    'category.models': never

    'category.multiplayer': never

    'category.optimization': never

    'category.quests': never

    'category.realistic': never

    'category.simplistic': never

    'category.social': never

    'category.storage': never

    'category.technology': never

    'category.themed': never

    'category.transportation': never

    'category.tweaks': never

    'category.utility': never

    'category.vanilla-like': never

    'category.worldgen': never

    'component.advertisement.provider': {
      provider: ValueArgument
    }

    'component.copy-code.title': never

    'component.file-input.default-prompt': never

    'component.modal-confirm.verify-text': {
      confirmationText: ValueArgument
    }

    'component.modal-confirm.verify-text-placeholder': never

    'component.modal-confirm.default-title': never

    'component.modal-confirm.default-description': never

    'component.modal-confirm.default-action': never

    'component.modal-creation.title': never

    'component.modal-creation.description': never

    'component.modal-creation.auto-description.warning': {
      projectType: /* clause */
        | 'mod'
        | /* clause */ 'plugin'
        | /* clause */ 'resourcepack'
        | /* clause */ 'modpack'
        | /* clause */ 'other'
    }

    'component.modal-creation.fields.project-type.title': {
      required: RichArgument
    }

    'component.modal-creation.fields.name.title': {
      required: RichArgument
    }

    'component.modal-creation.fields.name.placeholder': never

    'component.modal-creation.fields.url.title': {
      required: RichArgument
    }

    'component.modal-creation.fields.summary.title': {
      required: RichArgument
    }

    'component.modal-creation.fields.summary.description': never

    'component.modal-report.title': {
      itemType: /* clause */ 'user' | /* clause */ 'other'
    }

    'component.modal-report.description': {
      'tos-link': RichArgument
      'rules-link': RichArgument
    }

    'component.modal-report.action': never

    'component.modal-report.fields.reason.title': never

    'component.modal-report.fields.reason.placeholder': never

    'component.modal-report.fields.info.title': never

    'component.modal-report.fields.info.description': never

    'component.modal-transfer.title': {
      wallet: /* clause */
        | 'venmo'
        | /* clause */ 'paypal'
        | /* clause */ 'other'
    }

    'component.modal-transfer.description': {
      balance: ValueArgument
    }

    'component.modal-transfer.action.transfer': never

    'component.modal-transfer.action.settings': never

    'component.modal-transfer.fields.amount.placeholder': never

    'component.modal-transfer.fields.venmo-fee-consent.label': {
      fee: ValueArgument
      wallet: /* clause */ 'venmo' | /* clause */ 'other'
    }

    'component.modal-transfer.fields.regular-fee-consent.label': {
      fee: ValueArgument
      wallet: /* clause */ 'paypal' | /* clause */ 'other'
    }

    'component.modal-transfer.fields.account-confirm.label': {
      wallet: /* clause */
        | 'venmo'
        | /* clause */ 'paypal'
        | /* clause */ 'other'
      account: ValueArgument
    }

    'component.modal-transfer.error.min-amount-required': {
      amount: ValueArgument
    }

    'component.modal-transfer.error.max-amount-exceeded': {
      amount: ValueArgument
    }

    'component.modal-transfer.error.illegal-input': {
      amount: ValueArgument
    }

    'component.pagination.previous': never

    'component.pagination.next': never

    'component.project-card.author': {
      author: ValueArgument
    }

    'component.project-card.notice.has-mod-message': never

    'component.version-filter.field.loader.placeholder': never

    'component.version-filter.field.versions.placeholder': never

    'component.version-filter.field.versions.show-snapshots': never

    'component.version-filter.action.clear': never

    'generic.action.cancel': never

    'generic.action.continue': never

    'generic.error.title': never

    'generic.label.beta': never

    'loader.bukkit': never

    'loader.bungeecord': never

    'loader.fabric': never

    'loader.forge': never

    'loader.liteloader': never

    'loader.minecraft': never

    'loader.modloader': never

    'loader.paper': never

    'loader.purpur': never

    'loader.quilt': never

    'loader.rift': never

    'loader.spigot': never

    'loader.sponge': never

    'loader.velocity': never

    'loader.waterfall': never

    'markdown-editor.tab.source': never

    'markdown-editor.tab.preview': never

    'project.stats.downloads': {
      downloads: NumberArgument
      counter: ValueArgument
    }

    'project.stats.followers': {
      followers: NumberArgument
      counter: ValueArgument
    }

    'project.stats.created': {
      projectType: /* clause */ 'other'
      ago: ValueArgument
    }

    'project.stats.updated': {
      projectType: /* clause */ 'other'
      ago: ValueArgument
    }

    'project-type.mod-and-plugin.singular': never

    'project-type.mod-and-plugin.plural': never

    'project-type.mod.singular': never

    'project-type.mod.plural': never

    'project-type.modpack.singular': never

    'project-type.modpack.plural': never

    'project-type.plugin.singular': never

    'project-type.plugin.plural': never

    'project-type.resourcepack.singular': never

    'project-type.resourcepack.plural': never

    'project-type-display.mod-and-plugin': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'project-type-display.mod': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'project-type-display.plugin': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'project-type-display.modpack': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'report-type.spam': never

    'report-type.copyright': never

    'report-type.inappropriate': never

    'report-type.malicious': never

    'report-type.name-squatting': never
  }
}

type DechromifiedMeta<T = typeof import('~/i18n/en-US/meta.json')> = {
  [K in keyof T]: T[K] extends { message: string } ? T[K]['message'] : never
}

declare module '~/modules/i18n/templates/types' {
  interface LocaleData extends DechromifiedMeta {}

  interface LocaleImportedData {
    'starter.md': import('@formatjs/icu-messageformat-parser').MessageFormatElement[]
  }
}
