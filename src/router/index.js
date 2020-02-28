import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

// import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/home/index'),
        hidden: true,
        meta: {
            bgParticle: true,
            keepAlive: true,
            title: 'Home'
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        meta: {
            bgParticle: true,
            title: 'Login',
            keepAlive: false
        }
    },
    {
        path: '/mEditor',
        component: () => import('@/components/MarkdownEditor'),
        hidden: true,
        meta: {
            bgParticle: false,
            title: 'MarkdownEditor',
            keepAlive: false
        }
    },
    {
        name: 'edit',
        path: '/mEditor/:id',
        component: () => import('@/components/MarkdownEditor'),
        hidden: true,
        meta: {
            bgParticle: false,
            title: 'MarkdownEditor',
            keepAlive: false
        }
    },
    {
        path: '/aboutMe',
        component: () => import('@/views/profile/developerInfo'),
        hidden: true,
        meta: {
            bgParticle: true,
            keepAlive: true
        }
    },
    {
        path: '/contactMe',
        component: () => import('@/views/profile/ContactMe'),
        hidden: true,
        meta: {
            bgParticle: true,
            keepAlive: true
        }
    },
    {
        path: '/articles',
        component: () => import('@/views/article/overview'),
        hidden: true,
        meta: {
            bgParticle: false,
            keepAlive: true
        }
    },
    {
        name: 'articles',
        path: '/articles/:id',
        component: () => import('@/views/article/detail'),
        hidden: true,
        meta: {
            bgParticle: true,
            keepAlive: true
        }
    },
    {
        name: 'backend_console',
        path: '/console',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            bgParticle: false,
            keepAlive: true
        }
    },
    {
        name: 'ctgManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            bgParticle: false,
            keepAlive: true
        }
    },
    {
        name: 'prfManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            bgParticle: false,
            keepAlive: true
        }
    }
    // {
    //     name: 'editArticle',
    //     path:
    // }
];
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

export default router
