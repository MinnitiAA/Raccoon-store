import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import WishlistView from '../views/WishlistView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: WishlistView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrderHistoryView,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            user => {
                unsubscribe()
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async (to) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (!requiresAuth) {
        return true
    }

    const user = await getCurrentUser()

    if (!user) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }

    return true
})

export default router