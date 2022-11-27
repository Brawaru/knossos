<template>
  <div>
    <ModalReport
      ref="modal_project_report"
      :item-id="project.id"
      item-type="project"
    />
    <div
      :class="{
        'normal-page': true,
        'alt-layout': $cosmetics.projectLayout,
      }"
    >
      <article class="normal-page__sidebar">
        <div class="header card">
          <nuxt-link
            :to="
              '/' +
              project.project_type +
              '/' +
              (project.slug ? project.slug : project.id)
            "
          >
            <Avatar :src="project.icon_url" :alt="project.title" size="md" />
          </nuxt-link>
          <nuxt-link
            :to="
              '/' +
              project.project_type +
              '/' +
              (project.slug ? project.slug : project.id)
            "
          >
            <h1 class="title">{{ project.title }}</h1>
          </nuxt-link>
          <div v-if="sideTip != null">
            <div class="side-descriptor">
              <InfoIcon aria-hidden="true" />
              {{ sideTip }}
            </div>
          </div>

          <p class="description">
            {{ project.description }}
          </p>
          <Categories
            :categories="project.categories"
            :type="project.actualProjectType"
            class="categories"
          />
          <hr class="card-divider" />
          <div class="primary-stat">
            <DownloadIcon class="primary-stat__icon" aria-hidden="true" />
            <div class="primary-stat__text">
              <IntlFormatted
                message-id="project.stats.downloads"
                :values="{
                  downloads: $fmt.compactNumber(project.downloads),
                }"
              >
                <template #~counter="{ values: { downloads } }">
                  <span class="primary-stat__counter">
                    {{ String(downloads) }}
                  </span>
                </template>
              </IntlFormatted>
            </div>
          </div>
          <div class="primary-stat">
            <HeartIcon class="primary-stat__icon" aria-hidden="true" />
            <div class="primary-stat__text">
              <IntlFormatted
                message-id="project.stats.followers"
                :values="{
                  followers: $fmt.compactNumber(project.followers),
                }"
              >
                <template #~counter="{ values: { followers } }">
                  <span class="primary-stat__counter">
                    {{ String(followers) }}
                  </span>
                </template>
              </IntlFormatted>
            </div>
          </div>
          <div class="dates">
            <div
              v-tooltip="
                $fmt.date(project.published, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })
              "
              class="date"
            >
              <CalendarIcon aria-hidden="true" />
              {{
                $t('project.stats.created', {
                  ago: $fmt.timeDifference(project.published),
                  projectType: safeProjectType,
                })
              }}
            </div>
            <div
              v-tooltip="
                $fmt.date(project.updated, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })
              "
              class="date"
            >
              <UpdateIcon aria-hidden="true" />
              {{
                $t('project.stats.updated', {
                  ago: $fmt.timeDifference(project.updated),
                  projectType: safeProjectType,
                })
              }}
            </div>
          </div>
          <hr class="card-divider" />
          <div class="input-group">
            <template v-if="$auth.user">
              <button
                class="iconified-button"
                @click="$refs.modal_project_report.show()"
              >
                <ReportIcon aria-hidden="true" />
                {{ $t('generic.action.report') }}
              </button>
              <button
                v-if="!$user.follows.find((x) => x.id === project.id)"
                class="iconified-button"
                @click="$store.dispatch('user/followProject', project)"
              >
                <HeartIcon aria-hidden="true" />
                {{ $t('project.action.follow') }}
              </button>
              <button
                v-if="$user.follows.find((x) => x.id === project.id)"
                class="iconified-button"
                @click="$store.dispatch('user/unfollowProject', project)"
              >
                <HeartIcon fill="currentColor" aria-hidden="true" />
                {{ $t('project.action.unfollow') }}
              </button>
            </template>
            <template v-else>
              <a class="iconified-button" :href="authUrl">
                <ReportIcon aria-hidden="true" />
                {{ $t('generic.action.report') }}
              </a>
              <a class="iconified-button" :href="authUrl">
                <HeartIcon fill="currentColor" aria-hidden="true" />
                {{ $t('project.action.follow') }}
              </a>
            </template>
          </div>
        </div>
        <div
          v-if="
            currentMember &&
            (project.status !== 'approved' ||
              (project.moderator_message &&
                (project.moderator_message.message ||
                  project.moderator_message.body)))
          "
          class="project-status card"
        >
          <h3 class="card-header">
            {{ $t('project.status.title') }}
          </h3>
          <div class="status-info"></div>
          <p>
            <IntlFormatted
              message-id="project.status.description"
              :values="{ status: project.status }"
            >
              <template #badge="{ children }">
                <ProjectStatusBadge :status="project.status">
                  <Fragment :of="children" />
                </ProjectStatusBadge>
              </template>
            </IntlFormatted>
          </p>
          <div class="message">
            <p v-if="project.status === 'rejected'">
              {{ $t('project.status.explanation.rejected') }}
            </p>
            <p v-if="project.status === 'processing'">
              <IntlFormatted message-id="project.status.explanation.processing">
                <template #rules-link="{ children }">
                  <nuxt-link class="text-link" to="/legal/rules">
                    <Fragment :of="children" />
                  </nuxt-link>
                </template>
              </IntlFormatted>
            </p>
            <p v-if="project.status === 'draft'">
              {{ $t('project.status.explanation.draft') }}
            </p>
            <div v-if="project.moderator_message">
              <hr class="card-divider" />
              <div v-if="project.moderator_message.body">
                <h3 class="card-header">
                  {{ $t('project.status.moderator-message.title') }}
                </h3>
                <p
                  v-if="project.moderator_message.message"
                  class="mod-message__title"
                >
                  {{ project.moderator_message.message }}
                </p>
                <div
                  v-highlightjs
                  class="markdown-body"
                  v-html="$xss($md.render(project.moderator_message.body))"
                />
              </div>
              <div v-else>
                <h3 class="card-header">
                  {{ $t('project.status.moderator-message.title') }}
                </h3>
                <p>{{ project.moderator_message.message }}</p>
              </div>
              <hr class="card-divider" />
            </div>
          </div>
          <div class="buttons status-buttons">
            <button
              v-if="
                project.status === 'rejected' ||
                project.status === 'unlisted' ||
                project.status === 'abandoned'
              "
              class="iconified-button brand-button"
              @click="submitForReview"
            >
              <CheckIcon />
              {{ $t('project.status.action.resubmit') }}
            </button>
            <button
              v-if="project.status === 'draft'"
              class="iconified-button brand-button"
              @click="submitForReview"
            >
              <CheckIcon />
              {{ $t('project.action.submit-for-review') }}
            </button>
            <button
              v-if="project.status === 'approved'"
              class="iconified-button"
              @click="clearMessage"
            >
              <ClearIcon />
              {{ $t('project.status.action.clear-mod-message') }}
            </button>
          </div>
          <div v-if="showKnownErrors" class="known-errors">
            <ul>
              <li v-if="project.body === ''">
                {{ $t('project.validation-error.no-body') }}
              </li>
              <li v-if="project.versions.length < 1">
                {{ $t('project.validation-error.no-versions') }}
              </li>
              <li
                v-if="
                  project.client_side === 'unknown' ||
                  project.server_side === 'unknown'
                "
              >
                Your project must have the supported environments selected.
              </li>
            </ul>
          </div>
        </div>
        <div class="extra-info-desktop card">
          <template
            v-if="
              project.issues_url ||
              project.source_url ||
              project.wiki_url ||
              project.discord_url ||
              project.donation_urls.length > 0
            "
          >
            <h3 class="card-header">
              {{ $t('project.external-resources.title') }}
            </h3>
            <div class="links">
              <a
                v-if="project.issues_url"
                :href="project.issues_url"
                class="title"
                :target="$external()"
              >
                <IssuesIcon aria-hidden="true" />
                <span>{{ $t('project.external-resource.issues') }}</span>
              </a>
              <a
                v-if="project.source_url"
                :href="project.source_url"
                class="title"
                :target="$external()"
              >
                <CodeIcon aria-hidden="true" />
                <span>{{ $t('project.external-resource.source') }}</span>
              </a>
              <a
                v-if="project.wiki_url"
                :href="project.wiki_url"
                class="title"
                :target="$external()"
              >
                <WikiIcon aria-hidden="true" />
                <span>{{ $t('project.external-resource.wiki') }}</span>
              </a>
              <a
                v-if="project.discord_url"
                :href="project.discord_url"
                :target="$external()"
              >
                <DiscordIcon class="shrink" aria-hidden="true" />
                <span>{{ $t('project.external-resource.discord') }}</span>
              </a>
              <a
                v-for="(donation, index) in project.donation_urls"
                :key="index"
                :href="donation.url"
                :target="$external()"
              >
                <BuyMeACoffeeLogo
                  v-if="donation.id === 'bmac'"
                  aria-hidden="true"
                />
                <PatreonIcon
                  v-else-if="donation.id === 'patreon'"
                  aria-hidden="true"
                />
                <KoFiIcon
                  v-else-if="donation.id === 'ko-fi'"
                  aria-hidden="true"
                />
                <PayPalIcon
                  v-else-if="donation.id === 'paypal'"
                  aria-hidden="true"
                />
                <OpenCollectiveIcon
                  v-else-if="donation.id === 'open-collective'"
                  aria-hidden="true"
                />
                <HeartIcon v-else-if="donation.id === 'github'" />
                <UnknownIcon v-else />
                <span v-if="donation.id === 'bmac'">
                  {{ $t('project.external-resource.bmac') }}
                </span>
                <span v-else-if="donation.id === 'patreon'">
                  {{ $t('project.external-resource.patreon') }}
                </span>
                <span v-else-if="donation.id === 'paypal'">
                  {{ $t('project.external-resource.paypal') }}
                </span>
                <span v-else-if="donation.id === 'ko-fi'">
                  {{ $t('project.external-resource.ko-fi') }}
                </span>
                <span v-else-if="donation.id === 'github'">
                  {{ $t('project.external-resource.github-sponsors') }}
                </span>
                <span v-else>
                  {{ $t('project.external-resource.donate') }}
                </span>
              </a>
            </div>
            <hr class="card-divider" />
          </template>
          <template v-if="featuredVersions.length > 0">
            <div class="featured-header">
              <h3 class="card-header">
                {{ $t('project.featured-versions.title') }}
              </h3>
              <nuxt-link
                v-if="project.versions.length > 0 || currentMember"
                :to="`/${project.project_type}/${
                  project.slug ? project.slug : project.id
                }/versions`"
                class="goto-link"
              >
                {{ $t('project.featured-versions.action') }}
                <ChevronRightIcon
                  class="featured-header-chevron"
                  aria-hidden="true"
                />
              </nuxt-link>
            </div>
            <div
              v-for="version in featuredVersions"
              :key="version.id"
              class="featured-version button-transparent"
              @click="
                $router.push(
                  `/${project.project_type}/${
                    project.slug ? project.slug : project.id
                  }/version/${encodeURI(version.displayUrlEnding)}`
                )
              "
            >
              <a
                v-tooltip="
                  $t('project.version.file.action.download.tooltip', {
                    fileName: findPrimary(version).filename,
                    fileSize: $formatFileSize(findPrimary(version).size),
                  })
                "
                :href="findPrimary(version).url"
                class="download download-button"
                :title="
                  $t('project.version.file.action.download.title', {
                    fileName: findPrimary(version).filename,
                  })
                "
                @click.stop="(event) => event.stopPropagation()"
              >
                <DownloadIcon aria-hidden="true" />
              </a>
              <div class="info">
                <nuxt-link
                  :to="`/${project.project_type}/${
                    project.slug ? project.slug : project.id
                  }/version/${encodeURI(version.displayUrlEnding)}`"
                  class="top"
                >
                  {{ version.name }}
                </nuxt-link>
                <div
                  v-if="version.game_versions.length > 0"
                  class="game-version item"
                >
                  {{
                    version.loaders.map((x) => $formatCategory(x)).join(', ')
                  }}
                  {{ $formatVersion(version.game_versions) }}
                </div>
                <ReleaseChannelBadge :channel="version.version_type" />
              </div>
            </div>
            <hr class="card-divider" />
          </template>
          <h3 class="card-header">
            {{ $t('project.members.title') }}
          </h3>
          <div
            v-for="member in members"
            :key="member.user.id"
            class="team-member columns button-transparent"
            @click="$router.push('/user/' + member.user.username)"
          >
            <Avatar
              :src="member.avatar_url"
              :alt="member.username"
              size="sm"
              circle
            />

            <div class="member-info">
              <nuxt-link :to="'/user/' + member.user.username" class="name">
                <p>{{ member.name }}</p>
              </nuxt-link>
              <p class="role">{{ member.role }}</p>
            </div>
          </div>
          <hr class="card-divider" />
          <h3 class="card-header">
            {{ $t('project.technical-info.title') }}
          </h3>
          <div class="infos">
            <div class="info">
              <div class="key">
                {{ $t('project.technical-info.license') }}
              </div>
              <div class="value uppercase">
                <a
                  v-if="project.license.url"
                  class="text-link"
                  :href="project.license.url"
                >
                  {{ project.license.id }}
                </a>
                <span v-else>{{ project.license.id }}</span>
              </div>
            </div>
            <div
              v-if="
                project.project_type !== 'resourcepack' &&
                project.project_type !== 'plugin'
              "
              class="info"
            >
              <div class="key">
                {{ $t('project.technical-info.client-side') }}
              </div>
              <div class="value">
                {{
                  $t(`side-requirement.${project.client_side}`, {
                    side: 'client',
                  })
                }}
              </div>
            </div>
            <div
              v-if="
                project.project_type !== 'resourcepack' &&
                project.project_type !== 'plugin'
              "
              class="info"
            >
              <div class="key">
                {{ $t('project.technical-info.server-side') }}
              </div>
              <div class="value">
                {{
                  $t(`side-requirement.${project.server_side}`, {
                    side: 'server',
                  })
                }}
              </div>
            </div>
            <div class="info">
              <div class="key">
                {{ $t('project.technical-info.project-id') }}
              </div>
              <div class="value lowercase">
                <CopyCode :text="project.id" />
              </div>
            </div>
          </div>
        </div>
      </article>
      <section class="normal-page__content">
        <div v-if="project.status === 'unlisted'" class="card warning">
          <IntlFormatted
            message-id="project.notice.is-unlisted"
            :values="{ project: project.title }"
          >
            <template #sr-only="{ children }">
              <span class="sr-only"><Fragment :of="children" /></span>
            </template>
            <template #rules-link="{ children }">
              <nuxt-link to="/legal/rules">
                <Fragment :of="children" />
              </nuxt-link>
            </template>
          </IntlFormatted>
        </div>
        <div v-if="project.status === 'archived'" class="card warning">
          <IntlFormatted
            message-id="project.notice.is-archived"
            :values="{ project: project.title }"
          >
            <template #sr-only="{ children }">
              <span class="sr-only"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </div>
        <div v-if="project.status === 'abandoned'" class="card warning">
          <IntlFormatted
            message-id="project.notice.is-abandoned"
            :values="{ project: project.title }"
          >
            <template #sr-only="{ children }">
              <span class="sr-only"><Fragment :of="children" /></span>
            </template>
          </IntlFormatted>
        </div>
        <div v-if="project.project_type === 'modpack'" class="card warning">
          <IntlFormatted
            message-id="project.notice.is-modpack"
            :values="{ project: project.title }"
          >
            <template #sr-only="{ children }">
              <span class="sr-only"><Fragment :of="children" /></span>
            </template>

            <template #atl-link="{ children }">
              <a href="https://atlauncher.com/about" :target="$external()">
                <Fragment :of="children" />
              </a>
            </template>
            <template #mmc-link="{ children }">
              <a href="https://multimc.org/" :target="$external()">
                <Fragment :of="children" />
              </a>
            </template>
            <template #pl-link="{ children }">
              <a href="https://prismlauncher.org" :target="$external()">
                <Fragment :of="children" />
              </a>
            </template>
          </IntlFormatted>
        </div>
        <Advertisement
          v-if="project.status === 'approved' || project.status === 'unlisted'"
          type="banner"
          small-screen="square"
        />
        <NavRow
          :links="[
            {
              label: $t('project.description.title'),
              href: `/${project.project_type}/${
                project.slug ? project.slug : project.id
              }`,
            },
            {
              label: $t('project.gallery.title'),
              href: `/${project.project_type}/${
                project.slug ? project.slug : project.id
              }/gallery`,
              shown: project.gallery.length > 0 || !!currentMember,
            },
            {
              label: $t('project.changelog.title'),
              href: `/${project.project_type}/${
                project.slug ? project.slug : project.id
              }/changelog`,
              shown: project.versions.length > 0,
            },
            {
              label: $t('project.versions.title'),
              href: `/${project.project_type}/${
                project.slug ? project.slug : project.id
              }/versions`,
              shown: project.versions.length > 0 || !!currentMember,
            },
            {
              label: $t('project.settings.title'),
              href: `/${project.project_type}/${
                project.slug ? project.slug : project.id
              }/settings`,
              shown: !!currentMember,
            },
          ]"
          class="card"
        />
        <NuxtChild
          :project.sync="project"
          :versions.sync="versions"
          :featured-versions.sync="featuredVersions"
          :members.sync="members"
          :current-member="currentMember"
          :all-members.sync="allMembers"
          :dependencies.sync="dependencies"
        />
        <div class="extra-info-mobile card">
          <template
            v-if="
              project.issues_url ||
              project.source_url ||
              project.wiki_url ||
              project.discord_url ||
              project.donation_urls.length > 0
            "
          >
            <h3 class="card-header">
              {{ $t('project.external-resources.title') }}
            </h3>
            <div class="links">
              <a
                v-if="project.issues_url"
                :href="project.issues_url"
                class="title"
                :target="$external()"
              >
                <IssuesIcon aria-hidden="true" />
                <span>
                  {{ $t('project.external-resource.issues') }}
                </span>
              </a>
              <a
                v-if="project.source_url"
                :href="project.source_url"
                class="title"
                :target="$external()"
              >
                <CodeIcon aria-hidden="true" />
                <span>
                  {{ $t('project.external-resource.source') }}
                </span>
              </a>
              <a
                v-if="project.wiki_url"
                :href="project.wiki_url"
                class="title"
                :target="$external()"
              >
                <WikiIcon aria-hidden="true" />
                <span>
                  {{ $t('project.external-resource.wiki') }}
                </span>
              </a>
              <a
                v-if="project.discord_url"
                :href="project.discord_url"
                :target="$external()"
              >
                <DiscordIcon class="shrink" aria-hidden="true" />
                <span>
                  {{ $t('project.external-resource.discord') }}
                </span>
              </a>
              <a
                v-for="(donation, index) in project.donation_urls"
                :key="index"
                :href="donation.url"
                :target="$external()"
              >
                <BuyMeACoffeeLogo
                  v-if="donation.id === 'bmac'"
                  aria-hidden="true"
                />
                <PatreonIcon
                  v-else-if="donation.id === 'patreon'"
                  aria-hidden="true"
                />
                <KoFiIcon
                  v-else-if="donation.id === 'ko-fi'"
                  aria-hidden="true"
                />
                <PayPalIcon
                  v-else-if="donation.id === 'paypal'"
                  aria-hidden="true"
                />
                <OpenCollectiveIcon
                  v-else-if="donation.id === 'open-collective'"
                  aria-hidden="true"
                />
                <HeartIcon v-else-if="donation.id === 'github'" />
                <UnknownIcon v-else />
                <span v-if="donation.id === 'bmac'">
                  {{ $t('project.external-resource.bmac') }}
                </span>
                <span v-else-if="donation.id === 'patreon'">
                  {{ $t('project.external-resource.patreon') }}
                </span>
                <span v-else-if="donation.id === 'paypal'">
                  {{ $t('project.external-resource.paypal') }}
                </span>
                <span v-else-if="donation.id === 'ko-fi'">
                  {{ $t('project.external-resource.ko-fi') }}
                </span>
                <span v-else-if="donation.id === 'github'">
                  {{ $t('project.external-resource.github-sponsors') }}
                </span>
                <span v-else>
                  {{ $t('project.external-resource.donate') }}
                </span>
              </a>
            </div>
            <hr class="card-divider" />
          </template>
          <template v-if="featuredVersions.length > 0">
            <div class="featured-header">
              <h3 class="card-header">
                {{ $t('project.featured-versions.title') }}
              </h3>
              <nuxt-link
                v-if="project.versions.length > 0 || currentMember"
                :to="`/${project.project_type}/${
                  project.slug ? project.slug : project.id
                }/versions`"
                class="goto-link"
              >
                {{ $t('project.featured-versions.action') }}
                <ChevronRightIcon
                  class="featured-header-chevron"
                  aria-hidden="true"
                />
              </nuxt-link>
            </div>
            <div
              v-for="version in featuredVersions"
              :key="version.id"
              class="featured-version button-transparent"
              @click="
                $router.push(
                  `/${project.project_type}/${
                    project.slug ? project.slug : project.id
                  }/version/${encodeURI(version.displayUrlEnding)}`
                )
              "
            >
              <a
                v-tooltip="
                  $t('project.version.file.action.download.tooltip', {
                    fileName: findPrimary(version).filename,
                    fileSize: $formatFileSize(findPrimary(version).size),
                  })
                "
                :href="findPrimary(version).url"
                class="download download-button"
                :title="
                  $t('project.version.file.action.download.title', {
                    fileName: version.name,
                  })
                "
                @click.stop="(event) => event.stopPropagation()"
              >
                <DownloadIcon aria-hidden="true" />
              </a>
              <div class="info">
                <nuxt-link
                  :to="`/${project.project_type}/${
                    project.slug ? project.slug : project.id
                  }/version/${encodeURI(version.displayUrlEnding)}`"
                  class="top"
                >
                  {{ version.name }}
                </nuxt-link>
                <div
                  v-if="version.game_versions.length > 0"
                  class="game-version item"
                >
                  {{
                    $fmt.list(version.loaders.map((x) => $translateLoader(x)))
                  }}
                  {{ $formatVersion(version.game_versions) }}
                </div>
                <ReleaseChannelBadge :channel="version.version_type" />
              </div>
            </div>
            <hr class="card-divider" />
          </template>
          <h3 class="card-header">
            {{ $t('project.members.title') }}
          </h3>
          <div
            v-for="member in members"
            :key="member.user.id"
            class="team-member columns button-transparent"
            @click="$router.push('/user/' + member.user.username)"
          >
            <Avatar
              :src="member.avatar_url"
              :alt="member.username"
              size="sm"
              circle
            />

            <div class="member-info">
              <nuxt-link :to="'/user/' + member.user.username" class="name">
                <p>{{ member.name }}</p>
              </nuxt-link>
              <p class="role">{{ member.role }}</p>
            </div>
          </div>
          <hr class="card-divider" />
          <h3 class="card-header">
            {{ $t('project.technical-info.title') }}
          </h3>
          <div class="infos">
            <div class="info">
              <div class="key">{{ $t('project.technical-info.license') }}</div>
              <div class="value uppercase">
                <a
                  v-if="project.license.url"
                  class="text-link"
                  :href="project.license.url"
                >
                  {{ project.license.id }}
                </a>
                <span v-else>{{ project.license.id }}</span>
              </div>
            </div>
            <div
              v-if="
                project.project_type !== 'resourcepack' &&
                project.project_type !== 'plugin'
              "
              class="info"
            >
              <div class="key">
                {{ $t('project.technical-info.client-side') }}
              </div>
              <div class="value">
                {{
                  $t(`side-requirement.${project.client_side}`, {
                    side: 'client',
                  })
                }}
              </div>
            </div>
            <div
              v-if="
                project.project_type !== 'resourcepack' &&
                project.project_type !== 'plugin'
              "
              class="info"
            >
              <div class="key">
                {{ $t('project.technical-info.server-side') }}
              </div>
              <div class="value">
                {{
                  $t(`side-requirement.${project.server_side}`, {
                    side: 'server',
                  })
                }}
              </div>
            </div>
            <div class="info">
              <div class="key">
                {{ $t('project.technical-info.project-id') }}
              </div>
              <div class="value lowercase">
                <CopyCode :text="project.id" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import CalendarIcon from '~/assets/images/utils/calendar.svg?inline'
import CheckIcon from '~/assets/images/utils/check.svg?inline'
import ClearIcon from '~/assets/images/utils/clear.svg?inline'
import DownloadIcon from '~/assets/images/utils/download.svg?inline'
import UpdateIcon from '~/assets/images/utils/updated.svg?inline'
import CodeIcon from '~/assets/images/sidebar/mod.svg?inline'
import ReportIcon from '~/assets/images/utils/report.svg?inline'
import HeartIcon from '~/assets/images/utils/heart.svg?inline'
import InfoIcon from '~/assets/images/utils/info.svg?inline'
import IssuesIcon from '~/assets/images/utils/issues.svg?inline'
import WikiIcon from '~/assets/images/utils/wiki.svg?inline'
import DiscordIcon from '~/assets/images/external/discord.svg?inline'
import BuyMeACoffeeLogo from '~/assets/images/external/bmac.svg?inline'
import PatreonIcon from '~/assets/images/external/patreon.svg?inline'
import KoFiIcon from '~/assets/images/external/kofi.svg?inline'
import PayPalIcon from '~/assets/images/external/paypal.svg?inline'
import OpenCollectiveIcon from '~/assets/images/external/opencollective.svg?inline'
import UnknownIcon from '~/assets/images/utils/unknown-donation.svg?inline'
import ChevronRightIcon from '~/assets/images/utils/chevron-right.svg?inline'
import Advertisement from '~/components/ads/Advertisement'
import Categories from '~/components/ui/search/Categories'
import ModalReport from '~/components/ui/ModalReport'
import NavRow from '~/components/ui/NavRow'
import CopyCode from '~/components/ui/CopyCode'
import Avatar from '~/components/ui/Avatar'
import ProjectStatusBadge from '~/components/ui/ProjectStatusBadge.vue'
import ReleaseChannelBadge from '~/components/ui/ReleaseChannelBadge.vue'

export default {
  components: {
    Avatar,
    CopyCode,
    NavRow,
    Advertisement,
    ModalReport,
    IssuesIcon,
    DownloadIcon,
    CalendarIcon,
    CheckIcon,
    ClearIcon,
    UpdateIcon,
    CodeIcon,
    ReportIcon,
    HeartIcon,
    InfoIcon,
    WikiIcon,
    DiscordIcon,
    BuyMeACoffeeLogo,
    PayPalIcon,
    OpenCollectiveIcon,
    UnknownIcon,
    Categories,
    PatreonIcon,
    KoFiIcon,
    ChevronRightIcon,
    ProjectStatusBadge,
    ReleaseChannelBadge,
  },
  async asyncData(data) {
    try {
      if (
        !data.params.id ||
        !(
          data.$tag.projectTypes.find((x) => x.id === data.params.type) ||
          data.params.type === 'project'
        )
      ) {
        data.error({
          statusCode: 404,
          message: 'The page could not be found',
        })

        return
      }

      const [project, members, dependencies, versions, featuredVersions] = (
        await Promise.all([
          data.$axios.get(`project/${data.params.id}`, data.$defaultHeaders()),
          data.$axios.get(
            `project/${data.params.id}/members`,
            data.$defaultHeaders()
          ),
          data.$axios.get(
            `project/${data.params.id}/dependencies`,
            data.$defaultHeaders()
          ),
          data.$axios.get(
            `project/${data.params.id}/version`,
            data.$defaultHeaders()
          ),
          data.$axios.get(
            `project/${data.params.id}/version?featured=true`,
            data.$defaultHeaders()
          ),
        ])
      ).map((it) => it.data)

      const projectLoaders = {}

      for (const version of versions) {
        for (const loader of version.loaders) {
          projectLoaders[loader] = true
        }
      }

      project.actualProjectType = JSON.parse(
        JSON.stringify(project.project_type)
      )

      project.project_type = data.$getProjectTypeForUrl(
        project.project_type,
        Object.keys(projectLoaders)
      )

      if (
        project.project_type !== data.params.type ||
        data.params.id !== project.slug
      ) {
        let route = data.route.fullPath.split('/')
        route.splice(0, 3)
        route = route.filter((x) => x)

        data.redirect(
          301,
          `/${project.project_type}/${project.slug}${
            route.length > 0 ? `/${route.join('/')}` : ''
          }`
        )

        return
      }

      members.forEach((it, index) => {
        members[index].avatar_url = it.user.avatar_url
        members[index].name = it.user.username
      })

      let currentMember = data.$auth.user
        ? members.find((x) => x.user.id === data.$auth.user.id)
        : null

      if (
        !currentMember &&
        data.$auth.user &&
        (data.$auth.user.role === 'admin' ||
          data.$auth.user.role === 'moderator')
      ) {
        currentMember = {
          team_id: project.team_id,
          user: data.$auth.user,
          role: data.$auth.role,
          permissions: data.$auth.user.role === 'admin' ? 1023 : 12,
          accepted: true,
          payouts_split: 0,
          avatar_url: data.$auth.user.avatar_url,
          name: data.$auth.user.username,
        }
      }

      if (project.body_url && !project.body) {
        project.body = (await data.$axios.get(project.body_url)).data
      }

      const loaders = []

      versions.forEach((version) => {
        version.loaders.forEach((loader) => {
          if (!loaders.includes(loader)) {
            loaders.push(loader)
          }
        })
      })

      return {
        project,
        versions,
        featuredVersions,
        members: members.filter((x) => x.accepted),
        allMembers: members,
        currentMember,
        dependencies,
        loaders,
      }
    } catch {
      data.error({
        statusCode: 404,
        message: 'Project not found',
      })
    }
  },
  data() {
    return {
      showKnownErrors: false,
    }
  },
  fetch() {
    this.versions = this.$computeVersions(this.versions)
    this.featuredVersions = this.$computeVersions(this.featuredVersions)
  },
  head() {
    const title = this.$t('project.meta.title', {
      project: this.project.title,
      projectType: this.safeProjectType,
    })

    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.project.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.project.description} - Download the Minecraft ${
            this.projectTypeDisplay
          } ${this.project.title} by ${
            this.members.find((x) => x.role === 'Owner').user.username
          } on Modrinth`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.project.icon_url
            ? this.project.icon_url
            : 'https://cdn.modrinth.com/placeholder.png',
        },
        {
          hid: 'robots',
          name: 'robots',
          content:
            this.project.status === 'approved' ||
            this.project.status === 'archived'
              ? 'all'
              : 'noindeex',
        },
      ],
    }
  },
  computed: {
    authUrl() {
      return `${process.env.authURLBase}auth/init?url=${process.env.domain}${this.$route.path}`
    },
    coercedProjectType() {
      return /** @type {import('vue/types/vue').Vue} */ (
        this
      ).$coerceProjectType(this.project.project_type, this.loaders)
    },
    safeProjectType() {
      return this.coercedProjectType.replace(/-/g, '_')
    },
    projectSide() {
      return /** @type {import('vue/types/vue').Vue} */ (
        this
      ).$computeProjectSide(this.project.client_side, this.project.server_side)
    },
    sideTip() {
      return /** @type {import('vue/types/vue').Vue} */ (
        this
      ).$computeProjectTypeDisplay(this.projectSide, this.coercedProjectType)
    },
  },
  methods: {
    findPrimary(version) {
      let file = version.files.find((x) => x.primary)

      if (!file) {
        file = version.files[0]
      }

      if (!file) {
        file = { url: `/project/${this.project.id}/version/${version.id}` }
      }

      return file
    },
    async clearMessage() {
      this.$nuxt.$loading.start()

      try {
        await this.$axios.patch(
          `project/${this.project.id}`,
          {
            moderation_message: null,
            moderation_message_body: null,
          },
          this.$defaultHeaders()
        )

        this.project.moderator_message = null
      } catch (err) {
        this.$notify({
          group: 'main',
          title: 'An error occurred',
          text: err.response.data.description,
          type: 'error',
        })
      }

      this.$nuxt.$loading.finish()
    },
    async submitForReview() {
      if (
        this.project.body === '' ||
        this.project.versions.length < 1 ||
        this.project.client_side === 'unknown' ||
        this.project.server_side === 'unknown'
      ) {
        this.showKnownErrors = true
      } else {
        this.$nuxt.$loading.start()

        try {
          await this.$axios.patch(
            `project/${this.project.id}`,
            {
              status: 'processing',
            },
            this.$defaultHeaders()
          )

          this.project.status = 'processing'
        } catch (err) {
          this.$notify({
            group: 'main',
            title: 'An error occurred',
            text: err.response.data.description,
            type: 'error',
          })
        }

        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  grid-area: header;
  .title {
    margin: 0.25rem 0;
    color: var(--color-text-dark);
    font-size: var(--font-size-xl);
  }

  .side-descriptor {
    display: flex;
    align-items: center;
    color: var(--color-text-dark);
    font-weight: bold;
    font-size: var(--font-size-sm);
    margin-bottom: 0.5rem;

    svg {
      height: 1.25rem;
      margin-right: 0.125rem;
    }
  }

  .description {
    line-height: 1.3;

    margin-top: var(--spacing-card-sm);
    margin-bottom: 0.5rem;
    font-size: var(--font-size-nm);
  }

  .categories {
    margin: 0.25rem 0;
    color: var(--color-text-secondary);
    font-size: var(--font-size-nm);
  }

  .dates {
    margin: 0.75rem 0;

    .date {
      color: var(--color-text-secondary);
      font-size: var(--font-size-nm);
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      cursor: default;

      .label {
        margin-right: 0.25rem;
      }

      svg {
        height: 1rem;
        margin-right: 0.25rem;
      }
    }
  }
}

.project-info {
  height: auto;
  overflow: hidden;
}

.card-header {
  font-weight: bold;
  color: var(--color-heading);
  margin-bottom: 0.3rem;
  width: fit-content;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .card-header {
    height: 23px;
  }

  .goto-link {
    margin-bottom: 0.3rem;
  }
}

.featured-version {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;

  .download {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 0.75rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    .top {
      font-weight: bold;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }
  }
}

.links {
  a {
    display: inline-flex;
    align-items: center;
    border-radius: 1rem;

    svg,
    img {
      height: 1rem;
      width: 1rem;
    }

    span {
      margin-left: 0.25rem;
      text-decoration: underline;
      line-height: 2rem;
    }

    &:focus-visible,
    &:hover {
      svg,
      img,
      span {
        color: var(--color-heading);
      }
    }

    &:active {
      svg,
      img,
      span {
        color: var(--color-text-dark);
      }
    }

    &:not(:last-child)::after {
      content: '•';
      margin: 0 0.25rem;
    }
  }
}

.team-member {
  align-items: center;
  padding: 0.25rem 0.5rem;

  .member-info {
    overflow: hidden;
    margin: auto 0 auto 0.75rem;

    .name {
      font-weight: bold;
    }

    p {
      font-size: var(--font-size-sm);
      margin: 0.2rem 0;
    }
  }
}

.infos {
  .info {
    display: flex;
    margin: 0.5rem 0;

    .key {
      font-weight: bold;
      color: var(--color-text-secondary);
      width: 40%;
    }

    .value {
      width: 50%;

      &::first-letter {
        text-transform: capitalize;
      }

      &.lowercase {
        &::first-letter {
          text-transform: none;
        }
      }
    }

    .uppercase {
      text-transform: uppercase;
    }
  }
}

@media screen and (max-width: 550px) {
  .title a {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .project-navigation {
    display: block;
    overflow-x: auto;
    overflow-wrap: break-word;
    overflow-y: hidden;
  }
}

@media screen and (min-width: 1024px) {
  .content {
    max-width: calc(1280px - 21rem);
  }

  .extra-info-mobile {
    display: none;
  }
}

@media screen and (max-width: 1024px) {
  .extra-info-desktop {
    display: none;
  }
}

.status-buttons {
  margin-top: var(--spacing-card-sm);
}

.mod-message__title {
  font-weight: bold;
  margin-bottom: var(--spacing-card-xs);
  font-size: 1.125rem;
}
</style>
