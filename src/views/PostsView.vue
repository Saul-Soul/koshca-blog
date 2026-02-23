<script setup>
import { store } from '../data/store'
import PostCard from '../components/ui/PostCard.vue'
import BaseSection from '../components/ui/BaseSection.vue'
</script>

<template>
  <div class="posts-view">
    <BaseSection>
      <transition name="fade" appear>
        <div class="posts-content">
          <header class="view-header">
            <div class="brand-accent mb-4">Journal</div>
            <h1 class="heading-section mb-8">Thoughts & <span class="text-elegant">Observations</span></h1>
            <div class="divider mb-12"></div>
            <p class="view-intro text-secondary">
              从自我到世界，这里记录了我的思考。
            </p>
          </header>
          
          <div class="posts-grid">
            <div 
              v-for="post in store.posts" 
              :key="post.id"
              class="post-card-container"
            >
              <PostCard
                :title="post.title"
                :date="post.date"
                :excerpt="post.excerpt"
                :tags="post.tags"
                :slug="post.slug"
                :bgImage="post.backgroundImage"
                v-bind="post.aesthetics"
              />
            </div>
          </div>
        </div>
      </transition>
    </BaseSection>
  </div>
</template>

<style scoped>
.posts-view {
  padding-bottom: var(--spacer-24);
}

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

.posts-grid {
  padding-top: var(--spacer-8);
  display: grid;
  gap: var(--spacer-6);
  width: 100%;
  /* Atomic Stable Grid */
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 1600px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
