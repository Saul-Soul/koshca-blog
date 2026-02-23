import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Composable for scroll-triggered reveal animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger reveal
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @returns {Object} - Reactive refs and methods
 */
export function useScrollReveal(options = {}) {
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -100px 0px'
    } = options

    const elements = ref([])
    const observer = ref(null)
    const pendingElements = []

    const observeElement = (el) => {
        if (!el) return
        if (observer.value) {
            observer.value.observe(el)
            elements.value.push(el)
        } else {
            pendingElements.push(el)
        }
    }

    const unobserveElement = (el) => {
        if (el && observer.value) {
            observer.value.unobserve(el)
            elements.value = elements.value.filter(element => element !== el)
        }
    }

    onMounted(() => {
        observer.value = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-active')
                        // Optional: unobserve after reveal to improve performance
                        observer.value.unobserve(entry.target)
                    }
                })
            },
            {
                threshold,
                rootMargin
            }
        )

        // Process any elements that were queued before mount
        pendingElements.forEach(el => observeElement(el))
        pendingElements.length = 0
    })

    onUnmounted(() => {
        if (observer.value) {
            elements.value.forEach((el) => {
                observer.value.unobserve(el)
            })
            observer.value.disconnect()
        }
    })

    return {
        observeElement,
        unobserveElement
    }
}
