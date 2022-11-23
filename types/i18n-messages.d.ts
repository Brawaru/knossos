// This file is generated automatically from ~/i18n/en-US
// Use bin/i18n-type-gen.mjs script to re-generate it.

import '~/modules/i18n/templates/i18n'

import {
  RichArgument,
  ValueArgument,
  NumberArgument,
  DateArgument,
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

    'dashboard.title': never

    'dashboard.analytics.title': never

    'dashboard.overview.title': never

    'dashboard.overview.more-soon.title': never

    'dashboard.overview.more-soon.description': never

    'dashboard.overview.metric.downloads.title': never

    'dashboard.overview.metric.downloads.label': {
      projects: NumberArgument
    }

    'dashboard.overview.metric.followers.title': never

    'dashboard.overview.metric.followers.label': {
      projects: NumberArgument
    }

    'dashboard.overview.metric.revenue.title': never

    'dashboard.overview.metric.revenue.label': {
      amount: ValueArgument
    }

    'dashboard.overview.metric.balance.title': never

    'dashboard.overview.metric.balance.label': {
      minimumAmount: ValueArgument
    }

    'dashboard.overview.metric.balance.action': never

    'dashboard.projects.title': never

    'dashboard.revenue.title': never

    'dashboard.revenue.withdraw.title': never

    'dashboard.revenue.withdraw.description.default': {
      strong: RichArgument
      amount: ValueArgument
      'enroll-cta': RichArgument
    }

    'dashboard.revenue.withdraw.description.below-minimum': {
      strong: RichArgument
      amount: ValueArgument
      minimumAmount: ValueArgument
    }

    'dashboard.revenue.withdraw.description.no-earnings': never

    'dashboard.revenue.withdraw.action.transfer': {
      provider: ValueArgument
    }

    'dashboard.revenue.withdraw.action.settings': never

    'dashboard.revenue.withdraw.action.enroll': never

    'dashboard.revenue.fees.title': never

    'dashboard.revenue.fees.description': {
      amount: ValueArgument
    }

    'dependency-type.required': never

    'dependency-type.optional': never

    'dependency-type.incompatible': never

    'dependency-type.embedded': never

    'error-page.title': never

    'error-page.action.home': never

    'error-page.action.discord': never

    'error-page.default-message': never

    'project.external-resource.issues': never

    'project.external-resource.source': never

    'project.external-resource.wiki': never

    'project.external-resource.discord': never

    'project.external-resource.bmac': never

    'project.external-resource.patreon': never

    'project.external-resource.paypal': never

    'project.external-resource.ko-fi': never

    'project.external-resource.github-sponsors': never

    'project.external-resource.donate': never

    'project.action.submit-for-review': never

    'project.action.follow': never

    'project.action.unfollow': never

    'project.external-resources.title': never

    'project.members.title': never

    'project.description.title': never

    'project.meta.title': {
      project: ValueArgument
      projectType: /* clause */
        | 'mod'
        | /* clause */ 'mod_and_plugin'
        | /* clause */ 'plugin'
        | /* clause */ 'modpack'
        | /* clause */ 'resourcepack'
        | /* clause */ 'other'
    }

    'project.technical-info.title': never

    'project.technical-info.license': never

    'project.technical-info.client-side': never

    'project.technical-info.server-side': never

    'project.technical-info.project-id': never

    'project.notice.is-unlisted': {
      'sr-only': RichArgument
      project: ValueArgument
      'rules-link': RichArgument
    }

    'project.notice.is-archived': {
      'sr-only': RichArgument
      project: ValueArgument
    }

    'project.notice.is-abandoned': {
      'sr-only': RichArgument
      project: ValueArgument
    }

    'project.notice.is-modpack': {
      'sr-only': RichArgument
      project: ValueArgument
      'docs-link': RichArgument
      'atl-link': RichArgument
      'mmc-link': RichArgument
      'pl-link': RichArgument
    }

    'project.featured-versions.title': never

    'project.featured-versions.action': never

    'project.changelog.title': never

    'project.changelog.item.default': {
      version: ValueArgument
      span: RichArgument
      author: ValueArgument
      publishedAt: DateArgument
    }

    'project.changelog.item.authorless': {
      version: ValueArgument
      span: RichArgument
      publishedAt: DateArgument
    }

    'project.changelog.meta.title': {
      project: ValueArgument
    }

    'project.changelog.meta.description': {
      project: ValueArgument
      versions: NumberArgument
    }

    'project.edit.title': never

    'project.edit.field.name.name': never

    'project.edit.field.name.description': never

    'project.edit.field.name.placeholder': never

    'project.edit.field.description.name': never

    'project.edit.field.description.description': never

    'project.edit.field.description.placeholder': never

    'project.edit.field.categories.name': never

    'project.edit.field.categories.description': never

    'project.edit.field.categories.placeholder': never

    'project.edit.field.additional-categories.name': never

    'project.edit.field.additional-categories.description': never

    'project.edit.field.additional-categories.placeholder': never

    'project.edit.field.slug.name': never

    'project.edit.field.icon.name': never

    'project.edit.field.icon.preview.alt': never

    'project.edit.field.icon.prompt': never

    'project.edit.field.icon.action.revert': never

    'project.edit.field.environments.name': never

    'project.edit.field.environments.description': never

    'project.edit.field.environments.client.name': never

    'project.edit.field.environments.server.name': never

    'project.edit.field.environments.value.required': never

    'project.edit.field.environments.value.optional': never

    'project.edit.field.environments.value.unsupported': never

    'project.edit.field.body.name': never

    'project.edit.field.body.title': never

    'project.edit.field.body.description': {
      'md-help-link': RichArgument
    }

    'project.edit.field.body.empty-preview': never

    'project.edit.field.external-links.title': never

    'project.edit.field.external-links.issues-url.name': never

    'project.edit.field.external-links.issues-url.title': never

    'project.edit.field.external-links.source-url.name': never

    'project.edit.field.external-links.source-url.title': never

    'project.edit.field.external-links.wiki-url.name': never

    'project.edit.field.external-links.wiki-url.title': never

    'project.edit.field.external-links.discord-url.name': never

    'project.edit.field.external-links.discord-url.title': never

    'project.edit.field.license.name': never

    'project.edit.field.license.description': {
      'guide-link': RichArgument
    }

    'project.edit.field.license.default.placeholder': never

    'project.edit.field.license.custom.placeholder': never

    'project.edit.field.donation-links.name': never

    'project.edit.field.donation-links.action.add': never

    'project.edit.field.donation-links.action.remove': never

    'project.edit.field.donation-links.link.name': never

    'project.edit.field.donation-links.link.title': never

    'project.edit.field.donation-links.link-platform.name': never

    'project.edit.field.donation-links.link-platform.title': never

    'project.gallery.title': never

    'project.gallery.action.add-image.default': never

    'project.gallery.action.add-image.non-empty': never

    'project.gallery.meta.description': {
      images: NumberArgument
      project: ValueArgument
    }

    'project.gallery.item.action.remove': never

    'project.gallery.item.field.title.placeholder': never

    'project.gallery.item.field.description.placeholder': never

    'project.gallery.item.field.featured.label': never

    'project.gallery.item.field.file.prompt': never

    'project.settings.title': never

    'project.settings.error.no-multiple-owners': never

    'project.settings.general.title': never

    'project.settings.general.edit.title': never

    'project.settings.general.edit.description': never

    'project.settings.general.edit.action': never

    'project.settings.general.delete.title': never

    'project.settings.general.delete.description': never

    'project.settings.general.delete.action': never

    'project.settings.members.title': never

    'project.settings.members.invite.title': never

    'project.settings.members.invite.description': never

    'project.settings.members.field.username.label': never

    'project.settings.members.field.username.placeholder': never

    'project.settings.members.action.invite': never

    'project.settings.member.role.title': never

    'project.settings.member.role.description': never

    'project.settings.member.monetization-weight.title': never

    'project.settings.member.monetization-weight.description': never

    'project.settings.member.permissions.title': never

    'project.settings.member.action.remove': never

    'project.settings.member.action.make-owner': never

    'project.settings.member.permission.upload-version': never

    'project.settings.member.permission.delete-version': never

    'project.settings.member.permission.edit-details': never

    'project.settings.member.permission.edit-body': never

    'project.settings.member.permission.manage-invites': never

    'project.settings.member.permission.remove-member': never

    'project.settings.member.permission.edit-member': never

    'project.settings.member.permission.delete-project': never

    'project.settings.member.permission.view-analytics': never

    'project.settings.member.permission.view-payouts': never

    'project.settings.delete-modal.title': never

    'project.settings.delete-modal.description': never

    'project.settings.delete-modal.action': never

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

    'project.status.title': never

    'project.status.description': {
      badge: RichArgument
      status: /* clause */
        | 'approved'
        | /* clause */ 'rejected'
        | /* clause */ 'draft'
        | /* clause */ 'unlisted'
        | /* clause */ 'archived'
        | /* clause */ 'processing'
        | /* clause */ 'other'
    }

    'project.status.moderator-message.title': never

    'project.status.action.resubmit': never

    'project.status.action.clear-mod-message': never

    'project.status.explanation.rejected': never

    'project.status.explanation.processing': {
      'rules-link': RichArgument
    }

    'project.status.explanation.draft': never

    'project.validation-error.no-name': never

    'project.validation-error.no-description': never

    'project.validation-error.no-slug': never

    'project.validation-error.no-body': never

    'project.validation-error.no-versions': never

    'project.validation-error.no-license': never

    'project.version.status.featured': never

    'project.version.status.auto-featured': never

    'project.version.changelog.title': never

    'project.version.changelog.empty': never

    'project.version.loaders.title': never

    'project.version.downloads.title': never

    'project.version.version-number.title': never

    'project.version.game-versions.title': never

    'project.version.published.title': never

    'project.version.published.value.default': {
      publishedAt: DateArgument
      author: ValueArgument
    }

    'project.version.published.value.authorless': {
      publishedAt: DateArgument
    }

    'project.version.version-id.title': never

    'project.version.dependencies.title': never

    'project.version.external-dependencies.title': never

    'project.version.external-dependencies.info': never

    'project.version.files.title': never

    'project.version.files.file.primary': never

    'project.version.file.status.primary': never

    'project.version.file.action.remove': never

    'project.version.file.action.download.title': {
      fileName: ValueArgument
    }

    'project.version.file.action.download.tooltip': {
      fileName: ValueArgument
      fileSize: ValueArgument
    }

    'project.version.action.back-to-list': never

    'project.version.action.download-file': {
      fileName: ValueArgument
    }

    'project.version.dependency.version-bound': {
      version: ValueArgument
      type: /* clause */
        | 'required'
        | /* clause */ 'optional'
        | /* clause */ 'incompatible'
        | /* clause */ 'embedded'
        | /* clause */ 'other'
    }

    'project.version.dependency.project-bound': {
      type: /* clause */
        | 'required'
        | /* clause */ 'optional'
        | /* clause */ 'incompatible'
        | /* clause */ 'embedded'
        | /* clause */ 'other'
    }

    'project.version.dependency.unknown-project': never

    'project.version.deletion-modal.title': never

    'project.version.deletion-modal.description': never

    'project.version.deletion-modal.action': never

    'project.version.meta.title.create': {
      project: ValueArgument
    }

    'project.version.meta.title.default': {
      version: ValueArgument
      project: ValueArgument
    }

    'project.version.meta.description': {
      project: ValueArgument
      version: ValueArgument
      gameVersions: ValueArgument
      loaders: ValueArgument
      published: DateArgument
      downloads: NumberArgument
    }

    'project.version.metadata.title': never

    'project.version.metadata.release-channel.title': never

    'project.version.stats.downloads': {
      downloads: NumberArgument
      counter: ValueArgument
    }

    'project.version.edit.title': never

    'project.version.edit.add-dependency.title': never

    'project.version.edit.add-dependency.type.project': never

    'project.version.edit.add-dependency.type.version': never

    'project.version.edit.add-dependency.action': never

    'project.version.edit.add-dependency.field.id.placeholder.project': never

    'project.version.edit.add-dependency.field.id.placeholder.version': never

    'project.version.edit.add-dependency.field.type.placeholder': never

    'project.version.edit.add-dependency.field.test-something': never

    'project.version.edit.dependency.action.remove': never

    'project.version.edit.field.loaders.placeholder': never

    'project.version.edit.field.game-versions.placeholder': never

    'project.version.edit.field.game-versions.show-snapshots': never

    'project.version.edit.files.file.action.remove': never

    'project.version.edit.files.file.action.make-primary': never

    'project.version.edit.files.info': never

    'project.version.edit.files.modpack-notice': {
      'sr-only': RichArgument
      'doc-link': RichArgument
      'discord-link': RichArgument
    }

    'project.version.error.invalid-dependency.title': never

    'project.version.error.invalid-dependency.message': never

    'project.version.create.title': never

    'project.version.create.action.create': never

    'project.version.validation-error.no-version-number': never

    'project.version.validation-error.no-game-versions': never

    'project.version.validation-error.no-files': never

    'project.version.validation-error.no-loaders': never

    'project.versions.title': never

    'project.versions.action.create': never

    'project.versions.meta.title': {
      project: ValueArgument
    }

    'project.versions.meta.description': {
      versions: NumberArgument
      project: ValueArgument
      downloads: NumberArgument
      lastUpdated: DateArgument
    }

    'project.versions.column.version': never

    'project.versions.column.supports': never

    'project.versions.column.stats': never

    'project.versions.row.action.download.tooltip': {
      fileName: ValueArgument
      fileSize: ValueArgument
    }

    'project.versions.row.action.download.title': {
      version: ValueArgument
    }

    'project.versions.row.stats.published': {
      strong: RichArgument
      published: DateArgument
    }

    'footer.section.information.title': never

    'footer.section.information.open-source': {
      'gh-link': RichArgument
    }

    'footer.section.legal.title': never

    'footer.section.legal.link.terms': never

    'footer.section.legal.link.privacy': never

    'footer.section.legal.link.rules': never

    'footer.section.legal.link.license': never

    'footer.section.resources.title': never

    'footer.section.resources.link.blog': never

    'footer.section.resources.link.docs': never

    'footer.section.resources.link.status': never

    'footer.section.resources.link.github': never

    'footer.section.interact.title': never

    'footer.section.interact.link.discord': never

    'footer.section.interact.link.twitter': never

    'footer.section.interact.link.mastodon': never

    'footer.section.interact.link.crowdin': never

    'footer.notice.legal-mojang': never

    'generic.action.cancel': never

    'generic.action.continue': never

    'generic.action.delete': never

    'generic.action.download': never

    'generic.action.edit': never

    'generic.action.report': never

    'generic.action.save': never

    'generic.action.save-changes': never

    'generic.error.404.message': never

    'generic.error.title': never

    'generic.label.beta': never

    'generic.meta.page-title': {
      page: ValueArgument
    }

    'generic.meta.project-page-title': {
      project: ValueArgument
      page: ValueArgument
    }

    'generic.placeholder.select-one': never

    'generic.placeholder.valid-url': never

    'generic.title.settings': never

    'header.action.switch-theme': never

    'header.link.skip-to-content': never

    'header.link.home': never

    'header.navigation.aria-label': never

    'header.profile-dropdown.action.log-out': never

    'header.profile-dropdown.action.sign-in': never

    'header.profile-dropdown.avatar.alt': never

    'header.profile-dropdown.link.profile': never

    'header.profile-dropdown.link.follows': never

    'header.profile-dropdown.link.dashboard': never

    'layout.action.change-theme': never

    'layout.action.create-project': never

    'legal.common.warning': {
      'sr-only': RichArgument
    }

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

    'mobile-navigation.action.browse': never

    'moderation.title': never

    'notifications.title': never

    'payout-provider.venmo': never

    'payout-provider.paypal': never

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

    'project-release-channel.release': never

    'project-release-channel.beta': never

    'project-release-channel.alpha': never

    'project-status.approved': never

    'project-status.rejected': never

    'project-status.draft': never

    'project-status.unlisted': never

    'project-status.archived': never

    'project-status.processing': never

    'project-status.unknown': never

    'report-type.spam': never

    'report-type.copyright': never

    'report-type.inappropriate': never

    'report-type.malicious': never

    'report-type.name-squatting': never

    'side-requirement.required': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'side-requirement.optional': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'side-requirement.unsupported': {
      side: /* clause */ 'client' | /* clause */ 'server' | /* clause */ 'other'
    }

    'unit.size.bytes.short': {
      value: ValueArgument
    }

    'unit.size.bytes.long': {
      value: NumberArgument
    }

    'unit.size.kibibytes.short': {
      value: ValueArgument
    }

    'unit.size.kibibytes.long': {
      value: NumberArgument
    }

    'unit.size.mibibytes.short': {
      value: ValueArgument
    }

    'unit.size.mibibytes.long': {
      value: NumberArgument
    }

    'unit.size.gibibytes.short': {
      value: ValueArgument
    }

    'unit.size.gibibytes.long': {
      value: NumberArgument
    }

    'test.test-string': {
      something: ValueArgument
      somethingElse: /* clause */ 'owo' | /* clause */ 'other'
      randomNumber: NumberArgument
      randomCountOfPeople: NumberArgument
      wrapper: RichArgument
    }
  }
}

type DechromifiedMeta<T = typeof import('~/i18n/en-US/meta.json')> = {
  [K in keyof T]: T[K] extends { message: string } ? T[K]['message'] : never
}

declare module '~/modules/i18n/templates/types' {
  interface LocaleData extends DechromifiedMeta {}

  interface LocaleImportedData {
    'fees-explainer.html': import('@formatjs/icu-messageformat-parser').MessageFormatElement[]

    'starter.md': import('@formatjs/icu-messageformat-parser').MessageFormatElement[]
  }
}
