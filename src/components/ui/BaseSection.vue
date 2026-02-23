<script setup>
defineProps({
  tag: { type: String, default: 'section' },
  container: { type: Boolean, default: true },
  dark: { type: Boolean, default: false }
})
</script>

<template>
  <component 
    :is="tag" 
    class="base-section"
    :class="{ 'section-dark': dark }"
  >
    <div :class="{ 'container': container }">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.base-section {
  padding: var(--spacer-12) 0;
  position: relative;
}

.section-dark {
  background-color: var(--bg-secondary);
}

@media (max-width: 768px) {
  .base-section {
    padding: var(--spacer-8) 0;
  }
}
</style>
