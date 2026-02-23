<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  icon: String,
  accentColor: { type: String, default: 'var(--accent-base)' },
  bgImage: String,
  bgOpacity: { type: Number, default: 0.03 },
  bgHoverOpacity: { type: Number, default: 0.08 },
  // Hyper-Configurable Props
  hoverOffset: { type: String, default: '-4px' },
  hoverScale: { type: Number, default: 1.01 },
  glassBlur: { type: String, default: '20px' },
  glassOpacity: { type: Number, default: 0.01 },
  motionSpeed: { type: String, default: '0.8s' }
})

const cardStyles = computed(() => ({
  '--card-accent': props.accentColor,
  '--bg-opacity': props.bgOpacity,
  '--bg-hover-opacity': props.bgHoverOpacity,
  '--hover-offset': props.hoverOffset,
  '--hover-scale': props.hoverScale,
  '--glass-blur': props.glassBlur,
  '--glass-opacity': props.glassOpacity,
  '--motion-speed': props.motionSpeed
}))

const backgroundStyle = computed(() => {
  if (!props.bgImage) return {}
  return {
    backgroundImage: `url(${new URL(`../../assets/images/${props.bgImage}`, import.meta.url).href})`
  }
})
</script>

<template>
  <div 
    class="premium-card glass-panel-dynamic"
    :style="cardStyles"
  >
    <div 
      v-if="bgImage" 
      class="card-visual-bg"
      :style="backgroundStyle"
    ></div>
    <div class="card-content">
      <div class="card-icon-wrapper">
        <span class="card-icon">{{ icon }}</span>
      </div>
      <div class="card-text">
        <span class="card-subtitle text-elegant">{{ subtitle }}</span>
        <h3 class="card-title">{{ title }}</h3>
        <slot />
      </div>
      <div class="card-footer">
        <div class="accent-line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-panel-dynamic {
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border-hairline);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

.premium-card {
  position: relative;
  padding: clamp(var(--spacer-4), 5vw, var(--spacer-8));
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--motion-speed) var(--ease-out-expo), 
              background var(--motion-speed) var(--ease-out-expo),
              box-shadow var(--motion-speed) var(--ease-out-expo),
              border var(--motion-speed) var(--ease-out-expo);
}

.premium-card:hover {
  transform: translateY(var(--hover-offset)) scale(var(--hover-scale));
  background: rgba(255, 255, 255, calc(var(--glass-opacity) + 0.01));
  border-color: var(--border-soft);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-visual-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: var(--bg-opacity);
  transition: var(--transition-steady);
  filter: grayscale(1);
}

.premium-card:hover .card-visual-bg {
  opacity: var(--bg-hover-opacity);
  transform: scale(1.05);
  filter: grayscale(0.5);
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-icon-wrapper {
  margin-bottom: var(--spacer-4);
  font-size: clamp(1.5rem, 4vw, 2rem);
  opacity: 0.8;
}

.card-subtitle {
  display: block;
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--spacer-2);
}

.card-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  margin-bottom: var(--spacer-2);
}

.card-footer {
  margin-top: auto;
  padding-top: var(--spacer-4);
}

.accent-line {
  height: 1px;
  width: 30px;
  background: var(--card-accent);
  transition: var(--transition-steady);
}

.premium-card:hover .accent-line {
  width: 100%;
  box-shadow: 0 0 15px var(--card-accent);
}

@media (max-width: 480px) {
  .premium-card {
    padding: var(--spacer-6);
  }
}
</style>
