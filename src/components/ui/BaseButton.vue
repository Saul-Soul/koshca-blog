<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  tag: { type: String, default: 'button' },
  to: String
})
</script>

<template>
  <component 
    :is="tag === 'button' && to ? 'router-link' : tag"
    :to="to"
    class="base-button"
    :class="`btn-${variant}`"
  >
    <span class="btn-text"><slot /></span>
    <div v-if="variant === 'primary'" class="btn-aura"></div>
  </component>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-3) var(--spacer-8);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-steady);
  overflow: hidden;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--text-primary);
  color: var(--bg-deep);
}

.btn-primary:hover {
  background: var(--bg-deep);
  color: var(--text-primary);
  border-color: var(--border-soft);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--border-soft);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--text-muted);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.base-button:hover {
  transform: scale(1.02);
}

.btn-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--accent-gradient);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(15px);
  opacity: 0;
  transition: width 0.8s var(--ease-out-expo), height 0.8s var(--ease-out-expo), opacity 0.8s var(--ease-out-expo);
}

.btn-primary:hover .btn-aura {
  width: 150px;
  height: 150px;
  opacity: 0.1;
}
</style>
