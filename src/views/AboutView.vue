<script setup>
import BaseSection from '../components/ui/BaseSection.vue'
import { store } from '../data/store'
</script>

<template>
  <div class="about-view">
    <BaseSection>
      <transition name="reveal-anchor" appear>
        <div class="about-layout">
          <div class="about-main">
          <span class="brand-accent mb-4">Biography</span>
          <h1 class="heading-section mb-12">About <span class="text-elegant">{{ store.profile.name }}</span></h1>
          
          <div class="about-narrative text-secondary">
            <p v-for="(p, i) in store.profile.bio.split('\n')" :key="i" class="mb-4">
              {{ p }}
            </p>
            <p class="mb-8">
              我的旅程始于对“如何运作”的好奇。从拆解第一台旧电脑到运行第一个 Minecraft 服务器，我对技术的痴迷从未停止。现在，我将这种好奇心投入到编程、AI 研究以及手机系统底层探索中。
            </p>
            <p>
              但生活不仅仅是代码。在音乐的世界里，我是旋律的编织者；在镜头之后，我是光影的捕捉者。每一个像素和每一个音符，都是我构建个人宇宙的基石。
            </p>
          </div>
        </div>
        
        <aside class="about-specs">
          <div class="specs-card glass-panel">
            <h4 class="text-elegant mb-8">Metadata</h4>
            <div class="spec-item mb-4">
              <span class="spec-label">Location</span>
              <span class="spec-value">{{ store.profile.location }}</span>
            </div>
            <div class="spec-item mb-4">
              <span class="spec-label">Specialty</span>
              <span class="spec-value">{{ store.profile.specialty }}</span>
            </div>
            <div class="spec-item mb-8">
              <span class="spec-label">Focus</span>
              <span class="spec-value">{{ store.profile.focus }}</span>
            </div>
            <div class="divider mb-8"></div>
            <div class="about-tags">
               <span class="tag">Logic</span>
               <span class="tag">Aesthetics</span>
               <span class="tag">Future</span>
            </div>
          </div>
        </aside>
      </div>
      </transition>
    </BaseSection>
  </div>
</template>

<style scoped>
.about-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: clamp(var(--spacer-6), 6vw, var(--spacer-16));
  align-items: start;
}

.brand-accent {
  display: block;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--accent-base);
}

.about-narrative {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  line-height: 1.85;
  font-weight: 300;
}

.specs-card {
  padding: clamp(var(--spacer-6), 5vw, var(--spacer-12));
  border-radius: var(--radius-lg);
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-1);
}

.spec-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

.spec-value {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 400;
  color: var(--text-primary);
}

.about-tags {
  display: flex;
  gap: var(--spacer-2);
  flex-wrap: wrap;
}

.tag {
  font-size: 0.65rem;
  padding: 0.2rem 0.6rem;
  background: var(--bg-deep);
  border: 1px solid var(--border-hairline);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: var(--radius-sm);
}

@media (max-width: 1024px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: var(--spacer-12);
  }
  
  .specs-card {
    max-width: 500px;
  }
}

@media (max-width: 640px) {
  .about-view {
    padding-top: var(--spacer-8);
  }
}
</style>
