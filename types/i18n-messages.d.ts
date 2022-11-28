// This file is generated automatically from ~/i18n/en-US
// Use bin/i18n-type-gen.mjs script to re-generate it.

import '~/modules/i18n/templates/i18n'

import {
  RichArgument,
  ValueArgument,
  SelectArgument,
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

    'category-header.resolutions': never

    'category-header.categories': never

    'category-header.features': never

    'component.advertisement.provider': {
      provider: ValueArgument
    }

    'component.badge-report-type.text': {
      itemType: SelectArgument<'user' | 'other'>
      reasonText: ValueArgument
      reason: SelectArgument<
        'spam' | 'copyright' | 'malicious' | 'name_squatting' | 'other'
      >
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
      projectType: SelectArgument<
        'mod' | 'plugin' | 'resourcepack' | 'modpack' | 'other'
      >
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

    'component.modal-languages.title': never

    'component.modal-languages.contribution-notice': {
      'crowdin-link': RichArgument
    }

    'component.modal-languages.filler.no-results': never

    'component.modal-languages.action.enable-automatic': never

    'component.modal-languages.field.search.placeholder': never

    'component.modal-languages.auto-lockout.title': never

    'component.modal-languages.auto-lockout.description': {
      language: ValueArgument
    }

    'component.modal-languages.auto-lockout.action': never

    'component.modal-languages.language.browser-preferred': never

    'component.modal-languages.language.currently-used': never

    'component.modal-report.title': {
      itemType: SelectArgument<'user' | 'other'>
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
      wallet: SelectArgument<'venmo' | 'paypal' | 'other'>
    }

    'component.modal-transfer.description': {
      balance: ValueArgument
    }

    'component.modal-transfer.action.transfer': never

    'component.modal-transfer.action.settings': never

    'component.modal-transfer.fields.amount.placeholder': never

    'component.modal-transfer.fields.venmo-fee-consent.label': {
      fee: ValueArgument
      wallet: SelectArgument<'venmo' | 'other'>
    }

    'component.modal-transfer.fields.regular-fee-consent.label': {
      fee: ValueArgument
      wallet: SelectArgument<'paypal' | 'other'>
    }

    'component.modal-transfer.fields.account-confirm.label': {
      wallet: SelectArgument<'venmo' | 'paypal' | 'other'>
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

    'dashboard.sidebar-title': never

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

    'environment.client': never

    'environment.server': never

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
      projectType: SelectArgument<
        | 'mod'
        | 'mod_and_plugin'
        | 'plugin'
        | 'modpack'
        | 'resourcepack'
        | 'other'
      >
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
      ago: ValueArgument
      projectType: SelectArgument<'other'>
    }

    'project.stats.updated': {
      ago: ValueArgument
      projectType: SelectArgument<'other'>
    }

    'project.status.title': never

    'project.status.description': {
      badge: RichArgument
      status: SelectArgument<
        | 'approved'
        | 'rejected'
        | 'draft'
        | 'unlisted'
        | 'archived'
        | 'processing'
        | 'other'
      >
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
      type: SelectArgument<
        'required' | 'optional' | 'incompatible' | 'embedded' | 'other'
      >
    }

    'project.version.dependency.project-bound': {
      type: SelectArgument<
        'required' | 'optional' | 'incompatible' | 'embedded' | 'other'
      >
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

    'footer.section.legal.link.security': never

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

    'game-version-selector.include-snapshots': never

    'generic.action.cancel': never

    'generic.action.continue': never

    'generic.action.delete': never

    'generic.action.download': never

    'generic.action.edit': never

    'generic.action.report': never

    'generic.action.save': never

    'generic.action.save-changes': never

    'generic.action.confirm': never

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

    'generic.placeholder.choose-versions': never

    'generic.filler.up-to-date': never

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

    'landing.cover-image.alt': never

    'landing.headline': never

    'landing.introduction': {
      'gh-link': RichArgument
      'docs-link': RichArgument
    }

    'landing.field.search.label': never

    'landing.field.search.placeholder': never

    'landing.action.search': never

    'landing.point.search.search-image.alt': never

    'landing.point.search.deck': never

    'landing.point.search.headline': never

    'landing.point.search.text': never

    'landing.point.features.deck': never

    'landing.point.features.headline': never

    'landing.point.features.text': {
      'discord-link': RichArgument
    }

    'landing.point.features.feature.open-source': never

    'landing.point.features.feature.search': never

    'landing.point.features.feature.api': never

    'landing.point.features.feature.dependency-view': never

    'landing.point.features.feature.modpacks': never

    'landing.point.features.feature.payouts': never

    'landing.point.features.feature.analytics': never

    'landing.point.features.feature.unknown': never

    'landing.point.features.feature.project-types': never

    'landing.point.features.feature.launcher': never

    'landing.point.features.feature.own-auth': never

    'landing.point.features.feature.comments': never

    'landing.point.api.deck': never

    'landing.point.api.headline': never

    'landing.point.api.text': {
      'docs-link': RichArgument
    }

    'layout.action.change-theme': never

    'layout.action.change-language': never

    'layout.action.create-project': never

    'legal.title': never

    'legal.privacy.title.long': never

    'legal.privacy.title.short': never

    'legal.privacy.meta.description': never

    'legal.rules.title.long': never

    'legal.rules.title.short': never

    'legal.rules.meta.description': never

    'legal.terms.title.long': never

    'legal.terms.title.short': never

    'legal.terms.meta.description': never

    'legal.security.title': never

    'legal.security.meta.description': never

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

    'meta.description.long': never

    'meta.description.short': never

    'mobile-navigation.action.browse': never

    'moderation.title': never

    'moderation.placeholder': never

    'moderation.form.description': never

    'moderation.form.new-status': {
      status: ValueArgument
    }

    'moderation.form.action.approve': never

    'moderation.form.action.unlist': never

    'moderation.form.action.reject': never

    'moderation.form.field.message.placeholder': never

    'moderation.form.field.body.label': never

    'moderation.report.title': {
      h3: RichArgument
      item: ValueArgument
      itemType: SelectArgument<'project' | 'version' | 'user' | 'other'>
      reporter: ValueArgument
    }

    'moderation.report.created.text': {
      ago: ValueArgument
    }

    'moderation.report.created.tooltip': {
      received: ValueArgument
    }

    'moderation.report.action.delete': never

    'notifications.title': never

    'notifications.manage.title': never

    'notifications.action.go-to-follows': never

    'notifications.action.clear-all': never

    'notifications.notification.received': {
      ago: ValueArgument
    }

    'notifications.notification.action.dismiss': never

    'notifications.notification.action.accept': never

    'notifications.notification.action.deny': never

    'notifications.filter.team_invite': never

    'notifications.filter.project_update': never

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
      side: SelectArgument<'client' | 'server' | 'other'>
    }

    'project-type-display.mod': {
      side: SelectArgument<'client' | 'server' | 'other'>
    }

    'project-type-display.plugin': {
      side: SelectArgument<'client' | 'server' | 'other'>
    }

    'project-type-display.modpack': {
      side: SelectArgument<'client' | 'server' | 'other'>
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

    'search.notice.modpacks-alpha': {
      'doc-play-link': RichArgument
      'atl-link': RichArgument
      'mmc-link': RichArgument
      'pl-link': RichArgument
      'doc-create-link': RichArgument
      'discord-link': RichArgument
    }

    'search.filler.loading': never

    'search.filler.empty': never

    'search.meta.title': {
      searchType: SelectArgument<
        'mods' | 'plugins' | 'resourcepacks' | 'modpacks' | 'other'
      >
    }

    'search.meta.description': {
      searchType: SelectArgument<
        'mods' | 'plugins' | 'resourcepacks' | 'modpacks' | 'other'
      >
    }

    'search.top-link.skip-to-results': never

    'search.collapsible.show': never

    'search.collapsible.hide': never

    'search.controls.action.toggle-filters': never

    'search.controls.field.search.label': never

    'search.controls.field.search.placeholder': {
      projectType: ValueArgument
      searchType: SelectArgument<
        'mods' | 'plugins' | 'resourcepacks' | 'modpacks' | 'other'
      >
    }

    'search.controls.field.sort-by.label': never

    'search.controls.field.sort-by.value.relevance': never

    'search.controls.field.sort-by.value.downloads': never

    'search.controls.field.sort-by.value.follows': never

    'search.controls.field.sort-by.value.newest': never

    'search.controls.field.sort-by.value.updated': never

    'search.controls.field.per-page.label': never

    'search.filters.aria-label': never

    'search.filters.action.clear': never

    'search.filters.categories.aria-label': never

    'search.filters.loaders.aria-label': never

    'search.filters.loaders.title': never

    'search.filters.loaders.show-all': never

    'search.filters.platforms.aria-label': never

    'search.filters.platforms.title': never

    'search.filters.environments.aria-label': never

    'search.filters.environments.title': never

    'search.filters.game-versions.title': never

    'search.filters.licenses.title': never

    'search.filters.licenses.placeholder': never

    'settings.title': never

    'settings.category.user-settings.title': never

    'settings.modal-delete-account.title': never

    'settings.modal-delete-account.description': {
      strong: RichArgument
      'discord-link': RichArgument
    }

    'settings.modal-delete-account.action': never

    'settings.modal-revoke-token.title': never

    'settings.modal-revoke-token.action': never

    'settings.account.title.long': never

    'settings.account.title.short': never

    'settings.account.user-profile.title': never

    'settings.account.user-profile.description': never

    'settings.account.user-profile.action': never

    'settings.account.account-information.title': never

    'settings.account.account-information.description': never

    'settings.account.account-information.field.email.name': never

    'settings.account.account-information.field.email.placeholder': never

    'settings.account.account-information.validation-error.email-required-for-monetization': never

    'settings.account.authorization-token.title': never

    'settings.account.authorization-token.description': never

    'settings.account.authorization-token.action.copy.default': never

    'settings.account.authorization-token.action.copy.copied': never

    'settings.account.authorization-token.action.revoke': never

    'settings.account.account-deletion.title': never

    'settings.account.account-deletion.description': never

    'settings.account.account-deletion.action': never

    'settings.follows.title.long': never

    'settings.follows.title.short': never

    'settings.follows.empty': {
      'search-link': RichArgument
    }

    'settings.display.title.long': never

    'settings.display.title.short': never

    'settings.display.themes.title': never

    'settings.display.themes.color-theme.title': never

    'settings.display.themes.color-theme.description': never

    'settings.display.themes.color-theme.value.system': never

    'settings.display.themes.color-theme.value.light': never

    'settings.display.themes.color-theme.value.dark': never

    'settings.display.themes.color-theme.value.oled': never

    'settings.display.themes.flip-search-sidebar.title': never

    'settings.display.themes.flip-search-sidebar.description': never

    'settings.display.themes.flip-project-sidebar.title': never

    'settings.display.themes.flip-project-sidebar.description': never

    'settings.display.languages.title': never

    'settings.display.languages.language.title': never

    'settings.display.languages.language.description': never

    'settings.display.feature-flags.title': never

    'settings.display.feature-flags.hwa-effects.title': never

    'settings.display.feature-flags.hwa-effects.description': never

    'settings.display.feature-flags.modpack-notice.title': never

    'settings.display.feature-flags.modpack-notice.description': never

    'settings.display.feature-flags.external-links.title': never

    'settings.display.feature-flags.external-links.description': never

    'settings.monetization.title.long': never

    'settings.monetization.title.short': never

    'settings.monetization.revenue.title': never

    'settings.monetization.revenue.description': never

    'settings.monetization.revenue.action': never

    'settings.monetization.enrollment.title': never

    'settings.monetization.enrollment.action.account-settings': never

    'settings.monetization.enrollment.action.edit': never

    'settings.monetization.enrollment.description.must-have-email': never

    'settings.monetization.enrollment.description.not-enrolled': never

    'settings.monetization.enrollment.description.enrolled': {
      provider: ValueArgument
    }

    'settings.monetization.enrollment.form.description': {
      provider: ValueArgument
    }

    'settings.monetization.enrollment.form.field.account-type.value': {
      type: SelectArgument<'email' | 'phone' | 'user_handle' | 'other'>
    }

    'settings.monetization.enrollment.form.field.account.label': {
      provider: ValueArgument
      accountType: SelectArgument<'email' | 'phone' | 'user_handle' | 'other'>
    }

    'settings.monetization.enrollment.form.field.account.placeholder': {
      provider: ValueArgument
      accountType: SelectArgument<'email' | 'phone' | 'user_handle' | 'other'>
    }

    'settings.monetization.enrollment.form.tip.phone-format': never

    'settings.monetization.enrollment.form.action.save': never

    'settings.monetization.enrollment.form.action.remove': never

    'side-requirement.required': {
      side: SelectArgument<'client' | 'server' | 'other'>
    }

    'side-requirement.optional': {
      side: SelectArgument<'client' | 'server' | 'other'>
    }

    'side-requirement.unsupported': {
      side: SelectArgument<'client' | 'server' | 'other'>
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

    'user.avatar.alt': {
      username: ValueArgument
    }

    'user.action.edit': never

    'user.action.open-github': never

    'user.placeholder.current-user': {
      'create-link': RichArgument
    }

    'user.placeholder.default': never

    'user.not-found': never

    'user.meta.description.default': {
      bio: ValueArgument
      username: ValueArgument
    }

    'user.meta.description.without-bio': {
      username: ValueArgument
    }

    'user.edit.field.avatar.prompt': never

    'user.edit.field.username.label': never

    'user.edit.field.bio.label': never

    'user.stats.downloads': {
      downloads: NumberArgument
      counter: ValueArgument
    }

    'user.stats.project-followers': {
      followers: NumberArgument
      counter: ValueArgument
    }

    'user.stats.joined': {
      ago: ValueArgument
    }

    'user.stats.user-id': {
      id: ValueArgument
    }

    'user-role.admin': never

    'user-role.moderator': never

    'user-role.creator': never

    'test.test-string': {
      something: ValueArgument
      somethingElse: SelectArgument<'owo' | 'other'>
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

    'languages.json': typeof import('~/i18n/en-US/languages.json')

    'revoke-token.html': import('@formatjs/icu-messageformat-parser').MessageFormatElement[]

    'starter.md': import('@formatjs/icu-messageformat-parser').MessageFormatElement[]
  }
}
