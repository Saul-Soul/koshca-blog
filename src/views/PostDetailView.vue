<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../data/store'
import BaseButton from '../components/ui/BaseButton.vue'

const route = useRoute()
const router = useRouter()

const post = computed(() => {
  return store.posts.find(p => p.slug === route.params.id)
})

const goBack = () => {
  router.push('/posts')
}
</script>

<template>
  <transition name="reveal-anchor" mode="out-in" appear>
    <div 
      v-if="post" 
      class="post-detail-view"
      key="content"
    >
      <div class="container-narrow">
        <header class="post-header">
          <BaseButton @click="goBack" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Journal
          </BaseButton>
          
          <div class="post-metadata">
            <time class="post-date">{{ post.date }}</time>
            <span class="meta-separator">•</span>
            <div class="post-tags">
              <span v-for="tag in post.tags" :key="tag" class="post-tag">#{{ tag }}</span>
            </div>
          </div>
          
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </header>

        <div class="post-content" v-html="post.content"></div>
        
        <footer class="post-footer">
          <div class="footer-divider"></div>
          <BaseButton @click="goBack" class="back-btn-bottom">
            All Articles
          </BaseButton>
        </footer>
      </div>
    </div>
    <div v-else class="post-not-found" key="empty">
      <BaseSection title="Post Not Found" subtitle="Perhaps it has moved or was never here.">
        <BaseButton @click="goBack">Return to Journal</BaseButton>
      </BaseSection>
    </div>
  </transition>
</template>

<style scoped>
.post-detail-view {
  padding-top: var(--spacer-12);
  padding-bottom: var(--spacer-32);
}

.container-narrow {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.post-header {
  margin-bottom: var(--spacer-16);
}

.back-btn {
  margin-bottom: var(--spacer-12);
  display: flex !important;
  align-items: center;
  gap: var(--spacer-2);
  font-size: 0.8rem;
}

.post-metadata {
  display: flex;
  align-items: center;
  gap: var(--spacer-4);
  margin-bottom: var(--spacer-6);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.meta-separator {
  opacity: 0.3;
}

.post-tags {
  display: flex;
  gap: var(--spacer-3);
}

.post-tag {
  color: var(--accent-primary);
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  opacity: 0.8;
}

.post-title {
  font-family: var(--font-head);
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: var(--spacer-6);
  font-weight: 500;
}

.post-excerpt {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  line-height: 1.5;
  font-weight: 300;
  border-left: 2px solid var(--accent-primary);
  padding-left: var(--spacer-6);
  margin-bottom: var(--spacer-12);
}

.post-content {
  font-size: clamp(1.05rem, 1.8vw, 1.15rem);
  line-height: 1.8;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-weight: 300;
}

.post-content :deep(p) {
  margin-bottom: var(--spacer-8);
}

.post-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.post-footer {
  margin-top: var(--spacer-24);
}

.footer-divider {
  height: 1px;
  background: var(--border-hairline);
  margin-bottom: var(--spacer-12);
}

.post-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

@media (max-width: 768px) {
  .post-detail-view {
    padding-top: var(--spacer-8);
  }
}
</style>
