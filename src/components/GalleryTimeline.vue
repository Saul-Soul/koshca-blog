<script setup>
import { ref, reactive, computed } from 'vue'
import { store } from '../data/store'
import { useScrollReveal } from '../composables/useScrollReveal'

const { observeElement } = useScrollReveal({
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
})

const loadedImages = reactive({})
const activeId   = ref(null)
const activeSide = ref(null)

const handleMouseEnter = (item, index) => {
  activeId.value = item.id
  activeSide.value = index % 2 === 0 ? 'left' : 'right'
  store.galleryHovered = item.id
}

const handleMouseLeave = () => {
  activeId.value = null
  activeSide.value = null
  store.galleryHovered = null
}

const onImageLoad = (id) => { loadedImages[id] = true }
const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href

// Spine / single global dot position — derived from hover state
// Both are positioned relative to the SAME container (.gl),
// so their `left` percentages match perfectly.
const spineLeft = computed(() => {
  if (!activeId.value) return '50%'
  return activeSide.value === 'left' ? '93%' : '7%'
})

// activeItem's accent color for the dot
const activeColor = computed(() => {
  if (!activeId.value) return 'var(--border-soft)'
  return store.gallery.find(i => i.id === activeId.value)?.color ?? 'var(--accent-base)'
})
</script>

<template>
  <div class="gl" :class="{ 'any-hov': activeId }">

    <!--
      SPINE: absolute inside .gl — left:50% = centre of .gl padding box
    -->
    <div class="gl-spine" :style="{ left: spineLeft }"></div>

    <div
      v-for="(item, index) in store.gallery"
      :key="item.id"
      class="gl-row"
      :class="{
        'r-left':  index % 2 === 0,
        'r-right': index % 2 !== 0,
        'r-dim':   activeId && activeId !== item.id,
      }"
    >
      <!-- Per-row dot: follows spineLeft via inline style, active row glows -->
      <div
        class="gl-dot-row"
        :style="{
          left: activeId === item.id ? '50%' : spineLeft,
          background: activeId === item.id ? item.color : undefined,
          transform: activeId === item.id
            ? 'translate(-50%, -50%) scale(2.4)'
            : 'translate(-50%, -50%) scale(1)',
          boxShadow: activeId === item.id
            ? `0 0 10px ${item.color}, 0 0 24px ${item.color}55`
            : 'none',
        }"
      ></div>

      <!-- Card -->
      <div
        :ref="(el) => el && observeElement(el)"
        class="gl-card timeline-reveal"
        :class="{
          'card-on': activeId === item.id,
          'c-left':  index % 2 === 0,
          'c-right': index % 2 !== 0,
        }"
        :style="{ '--c': item.color }"
        @mouseenter="handleMouseEnter(item, index)"
        @mouseleave="handleMouseLeave"
      >
        <!-- 
          The whole content unit (image + text) now scales together.
          This ensures text "follows" the expansion perfectly.
        -->
        <div class="gl-card-content" :class="{ 'is-expanded': activeId === item.id }">
          <div class="img-shell" :class="{ loaded: loadedImages[item.id] }">
            <div class="img-hover-ring" :class="{ 'ring-on': activeId === item.id }">
              <img
                class="gl-img"
                :src="getImageUrl(item.image)"
                :alt="item.title"
                @load="onImageLoad(item.id)"
              />
            </div>
          </div>

          <!-- Caption is now inside the scaled unit -->
          <div class="gl-caption">
            <span class="cap-slug">{{ item.slug }}</span>
            <h3 class="cap-title">{{ item.title }}</h3>
            <p class="cap-desc">{{ item.desc }}</p>
            <div class="cap-tags">
              <span v-for="tag in item.tags" :key="tag" class="cap-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Base tokens ─── */
.gl {
  --ease: cubic-bezier(0.4, 0, 0.6, 1);
  --t: 0.6s;
  --card-w: 42%;
  --gap: 2.5rem;

  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 8vh var(--spacer-8);
  /* Overflow visible so expanded images can overlap siblings */
  overflow: visible;
}

/* ─── Spine ─── */
.gl-spine {
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;         /* overridden by inline style */
  width: 1px;
  background: var(--border-soft);
  opacity: 0.18;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
  transition: left var(--t) var(--ease), opacity var(--t) ease;
  will-change: left;
}

.any-hov .gl-spine { opacity: 0.04; }


/* ─── Rows ─── */
.gl-row {
  position: relative;
  margin-bottom: 10vh;
  transition: opacity var(--t) ease, filter var(--t) ease;
  will-change: opacity, filter;
}

.r-dim {
  opacity: 0.06;
  filter: blur(8px) grayscale(1);
  pointer-events: none;
}

/* Per-row dot — follows spine via inline left, glows for active row */
.gl-dot-row {
  position: absolute;
  left: 50%;   /* overridden by inline style */
  top: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-soft);
  border: 1.5px solid var(--bg-deep);
  transform: translate(-50%, -50%) scale(1);
  z-index: 10;
  pointer-events: none;
  transition: 
    left var(--t) var(--ease),
    transform var(--t) var(--ease), 
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* ─── Card (fixed width, no layout change) ─── */
.gl-card {
  position: relative;
  width: var(--card-w);
  z-index: 10;
}

.c-left  {
  margin-left: auto;
  margin-right: calc(50% + var(--gap));
  text-align: right;
}

.c-right {
  margin-left: calc(50% + var(--gap));
  text-align: left;
}

/* ─── Card Content Unit: Handles scale for both Image & Text ─── */
.gl-card-content {
  width: 100%;
  overflow: visible;
  position: relative;
  z-index: 100;
  transition: transform var(--t) var(--ease);
  will-change: transform;
}

/* 
  Expand inward toward center. 
  Left cards grow right (anchor left), Right cards grow left (anchor right).
*/
.c-left  .gl-card-content { transform-origin: left top; }
.c-right .gl-card-content { transform-origin: right top; }

.gl-card-content.is-expanded { 
  transform: scale(1.65); /* Scaled down slightly from 1.85 to keep text legible */
  z-index: 150; 
}

/* Anti-flicker: entrance-only layer */
.img-shell {
  opacity: 0;
  filter: blur(16px);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.img-shell.loaded {
  opacity: 1;
  filter: blur(0);
  transition: opacity 0.7s ease, filter 0.7s ease;
}

/* Hover ring effect (separate element from entrance — no GPU conflict) */
.img-hover-ring {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.2);
  transition: box-shadow var(--t) ease, border-radius var(--t) ease;
}

.ring-on {
  box-shadow: 0 24px 80px rgba(0,0,0,0.65);
  border-radius: var(--radius-lg);
}

.gl-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

/* ─── Caption ─── */
.gl-caption {
  margin-top: var(--spacer-4); /* reduced from 6 to account for visual scale spacing */
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s var(--ease);
  position: relative;
  z-index: 5;
}

/* Handle scroll reveal via card's scroll-active class */
.gl-card.scroll-active .gl-caption { opacity: 1; transform: translateY(0); }

/* Alignment locked — never overridden by hover */
.c-left  .gl-caption { text-align: right; }
.c-right .gl-caption { text-align: left; }
.c-left  .cap-tags   { justify-content: flex-end; }
.c-right .cap-tags   { justify-content: flex-start; }

.cap-slug {
  display: block;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c, var(--accent-base));
  margin-bottom: 0.25rem;
  opacity: 0.7;
}

.cap-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: var(--spacer-2);
}

.cap-desc {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-weight: 300;
}

.cap-tags { display: flex; gap: var(--spacer-2); margin-top: var(--spacer-2); }
.cap-tag  {
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  color: var(--text-muted);
  font-style: italic;
}

/* ─── Mobile ─── */
@media (max-width: 860px) {
  .gl-spine { left: 1.5rem; }
  .gl-dot-global { display: none; }

  .gl-card {
    width: calc(100% - 4rem) !important;
    margin-left: 4rem !important;
    margin-right: 0 !important;
    text-align: left !important;
  }

  .c-left .img-outer.img-exp,
  .c-right .img-outer.img-exp { transform: scale(1.2); }

  .c-left  .gl-caption,
  .c-right .gl-caption { text-align: left; }
  .c-left  .cap-tags,
  .c-right .cap-tags   { justify-content: flex-start; }
}
</style>
