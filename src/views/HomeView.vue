<script setup>
import HeroSection from '../components/HeroSection.vue'
import BaseSection from '../components/ui/BaseSection.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { store } from '../data/store'
</script>

<template>
  <div class="home-view">
    <HeroSection />
    
    <BaseSection>
      <div class="content-balance">
        <div class="intro-left animate-reveal stagger-1">
          <h2 class="heading-section mb-8">
            Curating the <span class="text-secondary">Intersection</span> of Logic and Art.
          </h2>
          <div class="divider mb-8"></div>
          <p class="text-secondary mb-12">
            每一行代码，每一段旋律，每一次快门，都是我对这个世界的热爱表达。在现代技术的精确性中，我寻找着永恒的优雅与平衡。
          </p>
          <BaseButton variant="secondary" to="/about">Read Dissertation</BaseButton>
        </div>
        
        <div class="intro-right animate-reveal stagger-2">
          <div class="image-gallery-placeholder glass-panel">
             <!-- Future: Image Gallery Grid -->
             <span class="text-muted text-elegant"><img src="/photo.jpg" alt="Visual Curation Portfolio" style="max-width: 100%; height: auto;"></span>
          </div>
        </div>
      </div>
    </BaseSection>
  </div>
</template>

<style scoped>
.content-balance {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(var(--spacer-8), 10vw, var(--spacer-24));
  align-items: center;
}

.intro-left {
  max-width: 600px;
}

.intro-right {
  width: 100%;
}

.image-gallery-placeholder {
  aspect-ratio: 4/5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.image-gallery-placeholder::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), transparent);
}

@media (max-width: 1024px) {
  .content-balance {
    grid-template-columns: 1fr;
    gap: var(--spacer-12);
    text-align: center;
  }
  
  .intro-left {
    margin: 0 auto;
  }

  .image-gallery-placeholder {
    aspect-ratio: 16/9;
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
