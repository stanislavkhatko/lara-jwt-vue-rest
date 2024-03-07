import * as VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import User from '../components/User.vue';
import Users from '../components/Users.vue';
import {authStore} from '../store/auth.js';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'dashboard',
            redirect: '/users',
            component: Dashboard,
            meta: {requiresAuth: true},
            children: [
                {
                    path: 'users',
                    name: 'users',
                    component: Users,
                    meta: {requiresAuth: true},
                    children: [{path: '', name: 'user', component: Users}],
                },
                {
                    path: 'users/new',
                    name: 'new-user',
                    component: User,
                    meta: {requiresAuth: true},
                    children: [{path: '', name: 'user', component: Dashboard}],
                },
                {
                    path: 'users/:id',
                    name: 'user',
                    component: User,
                    meta: {requiresAuth: true},
                    children: [{path: '', name: 'user', component: Dashboard}],
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {requiresAuth: false},
        },

    ]
})


// middleware
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!authStore().isLoggedIn) {
            next('/login');
            return;
        }

        next();
    } else {
        if (authStore().isLoggedIn) {
            next('/');
        } else {
            next();
        }
    }
});

export default router;
