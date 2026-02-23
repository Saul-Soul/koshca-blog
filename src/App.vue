<script setup>
import Navbar from './components/layout/Navbar.vue'
import { store } from './data/store'
</script>

<template>
  <div class="app-wrapper">
    <Navbar :class="{ 'is-dimmed': store.galleryHovered }" />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <footer class="footer" :class="{ 'is-dimmed': store.galleryHovered }">
      <div class="container footer-content">
        <p>&copy; 2026 Koshca. Crafted with Vue & Vite.</p>
        <div class="footer-links">
          <span>Aesthetics</span>
          <span>•</span>
          <span>Logic</span>
          <span>•</span>
          <span>Future</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import './index.css';

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: var(--nav-height); /* Clear fixed navbar */
}

.footer {
  padding: var(--spacer-12) 0;
  text-align: center;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-hairline);
  font-size: 0.9rem;
  transition: opacity 0.6s ease, filter 0.6s ease;
}

.is-dimmed {
  opacity: 0.1 !important;
  filter: blur(8px) grayscale(1);
  pointer-events: none;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.75rem;
  opacity: 0.5;
}

/* 
   Stage Transition: Contraction & Expansion (Fade-Scale)
   Creates a spatial "inhale/exhale" feeling during navigation.
*/
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.6s var(--ease-out-expo),
              transform 0.6s var(--ease-out-expo);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.97);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
