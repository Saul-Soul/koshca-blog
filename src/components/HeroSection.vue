<script setup>
import BaseButton from './ui/BaseButton.vue'
import { store } from '../data/store'
</script>

<template>
  <div class="hero">
    <div class="hero-overlay"></div>
    <transition name="reveal-anchor" appear>
      <div class="container hero-content">
        <div class="hero-brand">
          <span class="brand-line text-elegant">Architecture of Thought</span>
          <div class="brand-divider"></div>
        </div>
        
        <h1 class="heading-hero mb-8">
          <span class="block">{{ store.profile.name }}.</span>
          <span class="text-secondary block">{{ store.profile.title }}</span>
        </h1>
        
        <p class="hero-description mb-12">
          {{ store.profile.bio }}
        </p>
        
        <div class="hero-actions">
          <BaseButton variant="primary" to="/gallery">Explore Photos</BaseButton>
          <BaseButton variant="secondary" to="/about">Curation</BaseButton>
        </div>
      </div>
    </transition>
    
    <div class="hero-scroll-indicator">
      <div class="scroll-line"></div>
      <span class="scroll-text">Scroll to explore</span>
    </div>
  </div>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  background: url('../assets/images/hero_bg.png') no-repeat center center/cover;
  padding: var(--spacer-24) 0; /* Ensures content doesn't hit edges on mobile */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 10% 20%, rgba(10, 10, 11, 0.4) 0%, rgba(10, 10, 11, 1) 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
}

.hero-brand {
  display: flex;
  align-items: center;
  gap: var(--spacer-4);
  margin-bottom: var(--spacer-6);
}

.brand-line {
  font-size: clamp(0.9rem, 1.5vw, 1.15rem);
  color: var(--accent-base);
  letter-spacing: 0.1em;
}

.brand-divider {
  width: clamp(20px, 5vw, 40px);
  height: 1px;
  background: var(--border-soft);
}

.block {
  display: block;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  line-height: 1.8;
  font-weight: 300;
  max-width: 650px;
}

.hero-actions {
  display: flex;
  gap: var(--spacer-4);
  flex-wrap: wrap;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: var(--spacer-8);
  right: var(--spacer-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-4);
  opacity: 0.6;
}

.scroll-line {
  width: 1px;
  height: clamp(30px, 8vw, 60px);
  background: linear-gradient(to bottom, var(--border-soft), transparent);
}

.scroll-text {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  writing-mode: vertical-rl;
}

@media (max-width: 768px) {
  .hero {
    align-items: flex-end;
    padding-bottom: var(--spacer-24);
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
