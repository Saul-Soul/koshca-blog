<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { store } from '../data/store'

// 1. Advanced Vite Glob Import for static assets (performs compile-time mapping)
const imageModules = import.meta.glob('../assets/images/**/*', { eager: true, import: 'default' })
const getImageUrl = (name) => {
  const path = `../assets/images/${name}`
  return imageModules[path] || imageModules[`../assets/images/${name.split('_')[0]}.jpg`] || ''
}

const loadedImages = reactive({})
const activeId   = ref(null)
const activeSide = ref(null)
const containerRef = ref(null)
const groupRef = ref(null)
const isRevealed = ref(false)
const isScrolling = ref(false)

const singleGroupWidth = ref(0)
let animationFrameId = null
let scrollTimeout = null

// Lerp smooth scroll values
let targetScrollLeft = 0
let currentScrollLeft = 0
const speed = 0.6 // Speed of automatic slow scroll (pixels/frame)

// Touch interaction states
let startX = 0
const isInteracting = ref(false)

// Calculate float ratio value from fraction string (e.g. '16/9' -> 1.777)
const getAspectRatioValue = (ratioStr) => {
  if (!ratioStr) return 1.333
  const parts = ratioStr.split('/')
  if (parts.length === 2) {
    const num = parseFloat(parts[0])
    const den = parseFloat(parts[1])
    if (den !== 0) return num / den
  }
  return 1.333
}

// Dynamically compute optimal scale values based on image aspect ratio
// Maximized scale coefficients to deliver cinematic full-detail HD previews without clipping
const getHoverScale = (ratioStr) => {
  const val = getAspectRatioValue(ratioStr)
  if (val < 0.75) {
    return 2.15 // Portrait giant preview for narrow photos (e.g. 9/16) - highly detailed
  }
  if (val < 1.0) {
    return 1.90 // Elevated zoom for general vertical photos
  }
  return 1.70 // Cinematic large horizontal zoom (1.7x height, width expands to cover details)
}

// Exit scale and enter scrolling state temporarily when active USER scrolling occurs
const handleScrollActive = () => {
  if (activeId.value) {
    activeId.value = null
    activeSide.value = null
    store.galleryHovered = null
  }
  isScrolling.value = true
  
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false
  }, 200) // Re-enable hover 200ms after scrolling stops
}

const handleMouseEnter = (item, index) => {
  if (isScrolling.value || isInteracting.value) return
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

// Handle wheel events: translate vertical wheel scroll into horizontal offset
const onWheel = (e) => {
  if (!containerRef.value) return
  
  // Trigger scrolling state to exit hover zoom
  handleScrollActive()
  
  // Update target offset
  targetScrollLeft += e.deltaY * 0.85
}

// Touch controls for mobile / touch screens
const onTouchStart = (e) => {
  if (e.touches.length > 0) {
    startX = e.touches[0].clientX
    isInteracting.value = true
    handleScrollActive()
  }
}

const onTouchMove = (e) => {
  if (!isInteracting.value || e.touches.length === 0) return
  
  // Active dragging exits zoom
  handleScrollActive()
  
  const currentX = e.touches[0].clientX
  const deltaX = currentX - startX
  
  // Apply drag offset dynamically to target (1.25 factor for high responsiveness)
  targetScrollLeft -= deltaX * 1.25
  startX = currentX
}

const onTouchEnd = () => {
  isInteracting.value = false
}

// Unified frame-by-frame animation tick
const tick = () => {
  if (!containerRef.value) {
    animationFrameId = requestAnimationFrame(tick)
    return
  }

  const W = singleGroupWidth.value
  
  // Dynamically obtain group width once items render
  if (W <= 0) {
    if (groupRef.value) {
      singleGroupWidth.value = groupRef.value.offsetWidth
      if (singleGroupWidth.value > 0) {
        // Initial setup positioning to the center group
        targetScrollLeft = singleGroupWidth.value
        currentScrollLeft = singleGroupWidth.value
        containerRef.value.scrollLeft = singleGroupWidth.value
      }
    }
    animationFrameId = requestAnimationFrame(tick)
    return
  }

  // 1. Slow auto-scroll when not hovering AND not actively dragging
  if (!activeId.value && !isInteracting.value) {
    targetScrollLeft += speed
  }

  // 2. Smooth Lerp interpolation (0.08 damping value)
  currentScrollLeft += (targetScrollLeft - currentScrollLeft) * 0.08

  // 3. Infinite loop bounds correction
  if (targetScrollLeft >= 2 * W) {
    targetScrollLeft -= W
    currentScrollLeft -= W
    containerRef.value.scrollLeft = currentScrollLeft
  } else if (targetScrollLeft < W) {
    targetScrollLeft += W
    currentScrollLeft += W
    containerRef.value.scrollLeft = currentScrollLeft
  }

  // 4. Safely apply to the scroll DOM
  containerRef.value.scrollLeft = currentScrollLeft

  animationFrameId = requestAnimationFrame(tick)
}

// Handle resize events to recalculate unit width
const handleResize = () => {
  if (groupRef.value) {
    const prevW = singleGroupWidth.value
    const nextW = groupRef.value.offsetWidth
    if (nextW > 0 && prevW > 0) {
      // Re-scale target scroll position to preserve visually equivalent scrolled ratio
      const ratio = currentScrollLeft / prevW
      singleGroupWidth.value = nextW
      currentScrollLeft = nextW * ratio
      targetScrollLeft = nextW * ratio
      if (containerRef.value) {
        containerRef.value.scrollLeft = currentScrollLeft
      }
    } else if (nextW > 0) {
      singleGroupWidth.value = nextW
    }
  }
}

onMounted(() => {
  isRevealed.value = true
  
  nextTick(() => {
    // Wait momentarily for assets to load or layout to finalize
    setTimeout(() => {
      handleResize()
      animationFrameId = requestAnimationFrame(tick)
    }, 150)
  })
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  window.removeEventListener('resize', handleResize)
})

// Calculate active accent color for timeline spine
const activeColor = computed(() => {
  if (!activeId.value) return 'var(--border-soft)'
  return store.gallery.find(i => i.id === activeId.value)?.color ?? 'var(--accent-base)'
})
</script>

<template>
  <div 
    class="gl-container" 
    ref="containerRef" 
    @wheel.prevent="onWheel"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Horizontally spanning line centered with the dots -->
    <div class="gl-spine" :style="{ background: activeColor }"></div>

    <div class="gl-track" :class="{ 'any-hov': activeId }">
      
      <!-- Group 1 -->
      <div class="gl-group" ref="groupRef">
        <div
          v-for="(item, index) in store.gallery"
          :key="`g1-${item.id}`"
          class="gl-card timeline-reveal"
          :class="{
            'scroll-active': isRevealed,
            'r-dim': activeId && activeId !== item.id,
            'card-on': activeId === item.id,
          }"
          :style="{
            '--c': item.color,
            '--aspect-ratio-val': getAspectRatioValue(item.aspectRatio),
            '--hover-scale': getHoverScale(item.aspectRatio),
            transitionDelay: `${(index % store.gallery.length) * 0.04}s`
          }"
          @mouseenter="handleMouseEnter(item, index)"
          @mouseleave="handleMouseLeave"
        >
          <div class="gl-card-content" :class="{ 'is-expanded': activeId === item.id }">
            
            <!-- Structural placeholder guaranteeing static layouts and zero reflow jitter -->
            <div class="img-placeholder-box">
              <div 
                class="img-shell" 
                :class="{ loaded: loadedImages[item.id] }"
                :style="{
                  height: activeId === item.id ? 'calc(var(--gl-img-h) * var(--hover-scale))' : 'var(--gl-img-h)',
                  width: activeId === item.id ? 'calc(100% * var(--hover-scale))' : '100%'
                }"
              >
                <!-- Advanced Skeleton Shimmer Placeholder utilizing item color -->
                <div 
                  v-if="!loadedImages[item.id]" 
                  class="gl-placeholder" 
                  :style="{ background: `radial-gradient(circle at center, ${item.color}35, ${item.color}10)` }"
                >
                  <div class="gl-shimmer"></div>
                </div>
                <div class="img-hover-ring" :class="{ 'ring-on': activeId === item.id }">
                  <img
                    class="gl-img"
                    :src="getImageUrl(item.image)"
                    :alt="item.title"
                    decoding="async"
                    loading="lazy"
                    @load="onImageLoad(item.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Dot Row at midline -->
            <div
              class="gl-dot-row"
              :style="{
                background: activeId === item.id ? item.color : undefined,
                transform: activeId === item.id ? 'scale(2.2)' : 'scale(1)',
                boxShadow: activeId === item.id
                  ? `0 0 12px ${item.color}, 0 0 24px ${item.color}55`
                  : 'none',
              }"
            ></div>

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

      <!-- Group 2 -->
      <div class="gl-group">
        <div
          v-for="(item, index) in store.gallery"
          :key="`g2-${item.id}`"
          class="gl-card timeline-reveal"
          :class="{
            'scroll-active': isRevealed,
            'r-dim': activeId && activeId !== item.id,
            'card-on': activeId === item.id,
          }"
          :style="{
            '--c': item.color,
            '--aspect-ratio-val': getAspectRatioValue(item.aspectRatio),
            '--hover-scale': getHoverScale(item.aspectRatio),
            transitionDelay: `${(index % store.gallery.length) * 0.04}s`
          }"
          @mouseenter="handleMouseEnter(item, index)"
          @mouseleave="handleMouseLeave"
        >
          <div class="gl-card-content" :class="{ 'is-expanded': activeId === item.id }">
            
            <!-- Structural placeholder -->
            <div class="img-placeholder-box">
              <div 
                class="img-shell" 
                :class="{ loaded: loadedImages[item.id] }"
                :style="{
                  height: activeId === item.id ? 'calc(var(--gl-img-h) * var(--hover-scale))' : 'var(--gl-img-h)',
                  width: activeId === item.id ? 'calc(100% * var(--hover-scale))' : '100%'
                }"
              >
                <div 
                  v-if="!loadedImages[item.id]" 
                  class="gl-placeholder" 
                  :style="{ background: `radial-gradient(circle at center, ${item.color}35, ${item.color}10)` }"
                >
                  <div class="gl-shimmer"></div>
                </div>
                <div class="img-hover-ring" :class="{ 'ring-on': activeId === item.id }">
                  <img
                    class="gl-img"
                    :src="getImageUrl(item.image)"
                    :alt="item.title"
                    decoding="async"
                    loading="lazy"
                    @load="onImageLoad(item.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Dot Row at midline -->
            <div
              class="gl-dot-row"
              :style="{
                background: activeId === item.id ? item.color : undefined,
                transform: activeId === item.id ? 'scale(2.2)' : 'scale(1)',
                boxShadow: activeId === item.id
                  ? `0 0 12px ${item.color}, 0 0 24px ${item.color}55`
                  : 'none',
              }"
            ></div>

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

      <!-- Group 3 -->
      <div class="gl-group">
        <div
          v-for="(item, index) in store.gallery"
          :key="`g3-${item.id}`"
          class="gl-card timeline-reveal"
          :class="{
            'scroll-active': isRevealed,
            'r-dim': activeId && activeId !== item.id,
            'card-on': activeId === item.id,
          }"
          :style="{
            '--c': item.color,
            '--aspect-ratio-val': getAspectRatioValue(item.aspectRatio),
            '--hover-scale': getHoverScale(item.aspectRatio),
            transitionDelay: `${(index % store.gallery.length) * 0.04}s`
          }"
          @mouseenter="handleMouseEnter(item, index)"
          @mouseleave="handleMouseLeave"
        >
          <div class="gl-card-content" :class="{ 'is-expanded': activeId === item.id }">
            
            <!-- Structural placeholder -->
            <div class="img-placeholder-box">
              <div 
                class="img-shell" 
                :class="{ loaded: loadedImages[item.id] }"
                :style="{
                  height: activeId === item.id ? 'calc(var(--gl-img-h) * var(--hover-scale))' : 'var(--gl-img-h)',
                  width: activeId === item.id ? 'calc(100% * var(--hover-scale))' : '100%'
                }"
              >
                <div 
                  v-if="!loadedImages[item.id]" 
                  class="gl-placeholder" 
                  :style="{ background: `radial-gradient(circle at center, ${item.color}35, ${item.color}10)` }"
                >
                  <div class="gl-shimmer"></div>
                </div>
                <div class="img-hover-ring" :class="{ 'ring-on': activeId === item.id }">
                  <img
                    class="gl-img"
                    :src="getImageUrl(item.image)"
                    :alt="item.title"
                    decoding="async"
                    loading="lazy"
                    @load="onImageLoad(item.id)"
                  />
                </div>
              </div>
            </div>

            <!-- Dot Row at midline -->
            <div
              class="gl-dot-row"
              :style="{
                background: activeId === item.id ? item.color : undefined,
                transform: activeId === item.id ? 'scale(2.2)' : 'scale(1)',
                boxShadow: activeId === item.id
                  ? `0 0 12px ${item.color}, 0 0 24px ${item.color}55`
                  : 'none',
              }"
            ></div>

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
  </div>
</template>

<style scoped>
/* ─── Responsive Dimension CSS Variables ─── */
.gl-container {
  --ease: cubic-bezier(0.25, 1, 0.5, 1);
  --t: 0.6s;
  /* Top and bottom padding – keep top large for visual spacing, shrink bottom */
  --gl-pad-top: 300px;   /* distance to big title */
  --gl-pad-bottom: 10px; /* reduced bottom empty space */
  --gl-img-h: 260px;
  --gl-dot-margin: 1.5rem;
  --gl-card-gap: 2rem;
  /* Maximum hover scale for portrait images */
  --max-hover-scale: 2.15;

  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: var(--gl-pad-top) 0 var(--gl-pad-bottom) 0;
  /* Height accounts for scaled image + both paddings */
  height: calc(var(--gl-img-h) * var(--max-hover-scale) + var(--gl-pad-top) + var(--gl-pad-bottom));

  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

@media (max-width: 860px) {
  .gl-container {
    /* Mobile Scale Constants */
    --gl-pad: 140px;      
    --gl-img-h: 170px;
    --gl-dot-margin: 1rem;
    --gl-card-gap: 1.25rem;
    /* Mobile max hover scale is lower (≈2.0), compute height accordingly */
    --max-hover-scale: 2.0;
    height: calc(var(--gl-img-h) * var(--max-hover-scale) + var(--gl-pad) * 2);
  }
}

.gl-container::-webkit-scrollbar {
  display: none; /* Safari/Chrome */
}

/* ─── Spine (Horizontal Timeline Line) ─── */
.gl-spine {
  position: absolute;
  left: 0;
  right: 0;
  /* Mathematically centered line intersecting exactly the middle of all dots */
  top: calc(var(--gl-pad-top) + var(--gl-img-h) + var(--gl-dot-margin) + 4px);
  height: 1px;
  background: var(--border-soft);
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
  transition: background var(--t) ease, opacity var(--t) ease;
}

.any-hov .gl-spine {
  opacity: 0.02; /* Fade spine slightly on hover to highlight focused card */
}

/* ─── Track & Groups ─── */
.gl-track {
  display: flex;
  width: max-content;
  position: relative;
}

.gl-group {
  display: flex;
  flex-shrink: 0;
  align-items: center; /* Center cards vertically */
}

/* ─── Cards ─── */
.gl-card {
  position: relative;
  /* Card width calculated directly from image height * aspect ratio float value */
  width: calc(var(--gl-img-h) * var(--aspect-ratio-val, 1.333));
  margin: 0 var(--gl-card-gap);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 450px; /* Locked physical height of card bounds */
  z-index: 10;
  transition: opacity var(--t) ease, filter var(--t) ease;
  will-change: opacity, filter;
}

@media (max-width: 860px) {
  .gl-card {
    height: 310px; /* Mobile physical height bounds */
  }
}

/* Focus Mode: Dim out other non-hovered items */
.r-dim {
  opacity: 0.05;
  filter: blur(8px) grayscale(1);
  pointer-events: none;
}

/* ─── Card Content Wrapper ─── */
.gl-card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 100;
}

/* ─── Image Placeholder Box (Maintains layout dimensions) ─── */
.img-placeholder-box {
  position: relative;
  height: var(--gl-img-h);
  width: 100%;
  aspect-ratio: var(--aspect-ratio-val, 1.333);
}

/* ─── Image Shell (Changes physical width and height directly rather than scale) ─── */
.img-shell {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  border-radius: var(--radius-md);
  overflow: visible; /* Permits box shadow */
  
  /* Transition physical CSS properties directly to trigger browser re-rasterization */
  transition: 
    width var(--t) var(--ease), 
    height var(--t) var(--ease), 
    border-radius var(--t) ease;
  will-change: width, height;
  z-index: 2;
}

.gl-card-content.is-expanded .img-shell {
  z-index: 150;
}

/* High-tech color gradient placeholder */
.gl-placeholder {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gl-shimmer {
  width: 100%; height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.03) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer-anim 1.8s infinite;
  background-size: 200% 100%;
}

@keyframes shimmer-anim {
  0% { background-position: -150% 0; }
  100% { background-position: 150% 0; }
}

/* Hover Ring & Shadows */
.img-hover-ring {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: box-shadow var(--t) ease, border-radius var(--t) ease;
  opacity: 0;
  filter: blur(12px);
}

.img-shell.loaded .img-hover-ring {
  opacity: 1;
  filter: blur(0);
  transition: opacity 0.8s ease, filter 0.8s ease, box-shadow var(--t) ease;
}

.ring-on {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  border-radius: var(--radius-lg);
}

/* ─── Ultra-HD Render Optimization ─── */
.gl-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  image-rendering: -webkit-optimize-contrast; /* Sharpen image edges on Webkit */
  image-rendering: crisp-edges;
  transform: translate3d(0, 0, 0); /* Force GPU rasterization */
  backface-visibility: hidden;
  will-change: transform, filter;
  filter: contrast(1) brightness(1) saturate(1);
  transition: filter var(--t) var(--ease);
}

/* Advanced visual sharp filter on hover expansion */
.is-expanded .gl-img {
  filter: contrast(1.04) brightness(1.02) saturate(1.04); /* Tone-mapping adjustment for HDR clarity */
}

/* ─── Timeline Dots ─── */
.gl-dot-row {
  position: relative;
  margin: var(--gl-dot-margin) auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-soft);
  border: 1.5px solid var(--bg-deep);
  z-index: 10;
  pointer-events: none;
  transform-origin: center center;
  transition: 
    transform var(--t) var(--ease), 
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* ─── Caption (Captions align perfectly under the dot with independent scale) ─── */
.gl-caption {
  text-align: center;
  opacity: 0;
  transform: translateY(10px) scale(1) translate3d(0,0,0);
  transform-origin: center top;
  transition: opacity 0.5s ease, transform 0.5s var(--ease), filter var(--t) ease;
  position: relative;
  z-index: 5;
  will-change: transform, opacity;
}

/* Handle scroll reveal via stagger active class */
.gl-card.scroll-active .gl-caption {
  opacity: 1;
  transform: translateY(0) scale(1) translate3d(0,0,0);
}

/* Caption scales independently to keep font vectorized and crisp */
.is-expanded .gl-caption {
  opacity: 1;
  transform: translateY(15px) scale(1.08) translate3d(0,0,0); /* Displace slightly downwards and scale crisply */
}

.cap-slug {
  display: block;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c, var(--accent-base));
  margin-bottom: 0.35rem;
  opacity: 0.7;
}

.cap-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: var(--spacer-2);
}

.cap-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Truncate description slightly for horizontal compactness */
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 90%;
  margin: 0 auto;
}

.cap-tags {
  display: flex;
  gap: var(--spacer-2);
  margin-top: var(--spacer-2);
  justify-content: center;
  flex-wrap: wrap;
}

.cap-tag {
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  font-style: italic;
}
</style>
