import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView.vue')
        },
        {
            path: '/posts',
            name: 'posts',
            component: () => import('../views/PostsView.vue')
        },
        {
            path: '/posts/:id',
            name: 'post-detail',
            component: () => import('../views/PostDetailView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
