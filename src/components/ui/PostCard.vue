<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  date: String,
  excerpt: String,
  tags: Array,
  slug: String,
  bgImage: String,
  bgOpacity: { type: Number, default: 0.02 },
  bgHoverOpacity: { type: Number, default: 0.05 },
  // Hyper-Configurable Props
  hoverOffset: { type: String, default: '-2px' },
  hoverScale: { type: Number, default: 1.005 },
  glassBlur: { type: String, default: '15px' },
  glassOpacity: { type: Number, default: 0.01 },
  motionSpeed: { type: String, default: '0.6s' }
})

const cardStyles = computed(() => ({
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
  <router-link 
    :to="`/posts/${slug}`" 
    class="post-card glass-panel-dynamic"
    :style="cardStyles"
  >
    <div 
      v-if="bgImage" 
      class="card-visual-bg"
      :style="backgroundStyle"
    ></div>
    
    <div class="card-content">
      <div class="post-meta">
        <span class="post-date">{{ date }}</span>
        <div class="post-tags">
          <span v-for="tag in tags" :key="tag" class="post-tag">#{{ tag }}</span>
        </div>
      </div>
      
      <h3 class="post-title">{{ title }}</h3>
      <p class="post-excerpt">{{ excerpt }}</p>
      
      <div class="post-footer">
        <div class="footer-cta">
          <span class="read-more">Read Article</span>
          <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <div class="accent-line"></div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.glass-panel-dynamic {
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border-hairline);
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.15);
}

.post-card {
  display: flex;
  flex-direction: column;
  padding: clamp(var(--spacer-6), 5vw, var(--spacer-8));
  text-decoration: none;
  transition: transform var(--motion-speed) var(--ease-out-expo), 
              background var(--motion-speed) var(--ease-out-expo),
              box-shadow var(--motion-speed) var(--ease-out-expo),
              border var(--motion-speed) var(--ease-out-expo);
  height: 100%;
  position: relative;
  overflow: hidden;
}

.post-card:hover {
  border-color: var(--border-soft);
  transform: translateY(var(--hover-offset)) scale(var(--hover-scale));
  background: rgba(255, 255, 255, calc(var(--glass-opacity) + 0.01));
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

.post-card:hover .card-visual-bg {
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

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-6);
}

.post-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-body);
  letter-spacing: 0.05em;
}

.post-tags {
  display: flex;
  gap: var(--spacer-3);
}

.post-tag {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}

.post-title {
  font-family: var(--font-head);
  font-size: clamp(1.4rem, 2.5vw, 1.75rem);
  color: var(--text-primary);
  margin-bottom: var(--spacer-4);
  line-height: 1.25;
}

.post-excerpt {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacer-8);
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4);
}

.footer-cta {
  display: flex;
  align-items: center;
  gap: var(--spacer-2);
  color: var(--accent-primary);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.accent-line {
  height: 1px;
  width: 30px;
  background: var(--accent-primary);
  transition: var(--transition-steady);
}

.post-card:hover .accent-line {
  width: 100%;
  box-shadow: 0 0 15px var(--accent-primary);
}

.arrow-icon {
  transition: transform var(--transition-steady);
}

.post-card:hover .arrow-icon {
  transform: translateX(4px);
}
</style>
