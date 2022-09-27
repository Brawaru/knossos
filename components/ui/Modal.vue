<template>
  <div class="modal-host" :class="{ shown }">
    <div :class="{ shown: shown }" class="modal-overlay" @click="hide" />
    <div class="modal-body" :class="{ shown: shown }">
      <div v-if="header" class="header">
        <h1>{{ header }}</h1>
        <button
          class="iconified-button icon-only transparent close-button"
          @click="hide"
        >
          <CrossIcon />
        </button>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CrossIcon from '~/assets/images/utils/x.svg?inline'

export default {
  name: 'Modal',
  components: {
    CrossIcon,
  },
  props: {
    header: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      shown: false,
    }
  },
  methods: {
    show() {
      this.shown = true
    },
    hide() {
      this.shown = false
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-host {
  display: grid;
  align-items: center;
  justify-items: center;
  position: fixed;
  z-index: 20;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  &.shown {
    pointer-events: unset;
  }
}

.modal-overlay {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  transition-delay: 0;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-property: opacity, background, backdrop-filter, visibility;

  &.shown {
    opacity: 1;
    visibility: visible;
    background: hsla(0, 0%, 0%, 0.5);
    backdrop-filter: blur(3px);

    @media screen and (max-width: 750px),
      screen and (orientation: landscape) and (max-width: 961px) {
      backdrop-filter: unset;
    }
  }
}

.modal-body {
  position: relative;
  z-index: 21;
  box-shadow: var(--shadow-raised), var(--shadow-inset);
  border-radius: var(--size-rounded-lg);
  max-height: 80%;
  overflow-y: auto;
  width: 600px;

  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-bg);
    padding: var(--spacing-card-md) var(--spacing-card-lg);

    h1 {
      font-size: 1.25rem;
    }
  }

  .content {
    background-color: var(--color-raised-bg);
  }

  top: calc(100% + 400px);
  visibility: hidden;
  opacity: 0;
  transition-delay: 0;
  transition-duration: 0.25s;
  transition-property: opacity, top, visibility;
  transition-timing-function: ease-in-out;

  &.shown {
    opacity: 1;
    visibility: visible;
    top: 0;
  }

  @media screen and (max-width: 750px),
    screen and (orientation: landscape) and (max-width: 961px) {
    max-height: 100%;
    width: 100vw;
    height: 100vh;
    border-radius: unset;
    background: var(--color-raised-bg);

    .header {
      background: unset;

      .close-button {
        border-radius: 50px;
        border: 2px solid grey;
        padding: 5px;
        aspect-ratio: 1 / 1;
        display: grid;
        align-items: center;
        justify-items: center;
      }
    }
  }
}
</style>
