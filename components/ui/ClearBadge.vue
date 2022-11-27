<script>
// @ts-check
import { defineComponent, computed } from 'vue'

/** @typedef {'red' | 'orange' | 'green' | 'blue' | 'purple' | 'gray'} BadgeColor */

/**
 * Unlike regular Badge component, ClearBadge is stripped of all the hardcoded
 * values and requires its value to be passed as a default slot. The default
 * circle can also be replaced using the `icon` slot. Values for the `color`
 * property are typed.
 */
export default defineComponent({
  name: 'ClearBadge',
  props: {
    color: {
      type: /** @type {import('vue').PropType<BadgeColor>} */ (String),
      default: null,
    },
  },
  setup(props) {
    const className = computed(() => {
      const cls = ['badge']

      if (props.color != null) {
        cls.push(`color--${props.color}`)
      }

      return cls
    })

    return { className }
  },
})
</script>

<template>
  <span :class="className">
    <slot name="icon"><span class="circle" /></slot>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
$badge-colors: (
  'red': var(--color-special-red),
  'orange': var(--color-special-orange),
  'green': var(--color-special-green),
  'blue': var(--color-special-blue),
  'purple': var(--color-special-purple),
  'gray': var(--color-special-gray),
);

.badge {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: fit-content;
  --badge-color: var(--color-special-gray);
  color: var(--badge-color);
  white-space: normal; // protection in case used inline

  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.25rem;
    background-color: var(--badge-color);
  }

  svg {
    margin-right: 0.25rem;
  }

  @each $color-name, $color in $badge-colors {
    &.#{'color--' + $color-name} {
      --badge-color: #{$color};
    }
  }
}
</style>
