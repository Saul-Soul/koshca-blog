<script setup>
import GalleryTimeline from '../components/GalleryTimeline.vue'
import BaseSection from '../components/ui/BaseSection.vue'
</script>

<template>
  <div class="gallery-view">
    <BaseSection>
      <transition name="reveal-anchor" appear>
        <header class="view-header">
          <div class="brand-accent mb-4">Portfolio</div>
          <h1 class="heading-section mb-8">Curated <span class="text-elegant">Gallery</span></h1>
          <div class="divider mb-12"></div>
          <p class="view-intro text-secondary">
            每一张照片都是我生活的一部分, 记录着我的喜怒哀乐, 也是我成长的见证。
          </p>
        </header>
      </transition>
      
      <GalleryTimeline />
    </BaseSection>
  </div>
</template>

<style scoped>
.view-header {
  max-width: 800px;
  margin-bottom: var(--spacer-12);
}

.brand-accent {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--accent-base);
}

.view-intro {
  font-size: 1.15rem;
  line-height: 1.8;
  font-weight: 300;
}
</style>
