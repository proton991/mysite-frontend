import Vue from 'vue'
import Router from 'vue-router'
import {getToken} from "@/utils/sessionUtil";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(Router);

// import Layout from '@/layout'

export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/home/index'),
        // component: resolve => require(['@/views/home/index'], resolve),
        hidden: true,
        meta: {
            bgParticle: true,
            keepAlive: true,
            title: 'Home',
            isOverview: false
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
        meta: {
            bgParticle: true,
            title: 'Login',
            keepAlive: false,
            isOverview: false
        }
    },
    {
        path: '/mEditor',
        component: () => import('@/components/MarkdownEditor'),
        hidden: true,
        meta: {
            bgParticle: false,
            title: 'MarkdownEditor',
            keepAlive: false,
            isOverview: false
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
            keepAlive: false,
            isOverview: false
        }
    },
    {
        path: '/aboutMe',
        component: () => import('@/views/profile/developerInfo'),
        hidden: true,
        meta: {
            bgParticle: true,
            title: 'AboutMe',
            keepAlive: true,
            isOverview: false
        }
    },
    {
        path: '/contactMe',
        component: () => import('@/views/profile/ContactMe'),
        hidden: true,
        meta: {
            bgParticle: true,
            title: 'ContactMe',
            keepAlive: true,
            isOverview: false
        }
    },
    {
        path: '/articles',
        component: () => import('@/views/article/overview'),
        hidden: true,
        meta: {
            title: 'Articles',
            bgParticle: false,
            keepAlive: true,
            isOverview: true
        }
    },
    {
        name: 'articles',
        path: '/articles/:id',
        component: () => import('@/views/article/detail'),
        hidden: true,
        meta: {
            title: 'Article',
            bgParticle: true,
            keepAlive: true,
            isOverview: false
        }
    },
    {
        name: 'backend_console',
        path: '/console',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
            bgParticle: false,
            keepAlive: true,
            isOverview: false
        }
    },
    {
        name: 'ctgManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
            bgParticle: false,
            keepAlive: true,
            isOverview: false
        }
    },
    {
        name: 'prfManage',
        path: '/console/:panel_name',
        component: () => import('@/views/console/index'),
        hidden: true,
        meta: {
            title: 'Console',
            bgParticle: false,
            keepAlive: true,
            isOverview: false
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

const whiteList = ['/login', '/', '/aboutMe', '/contactMe', '/articles'];
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    document.title = to.meta.title;

    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            next({ path : '/'});
            NProgress.done();
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/articles')) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }

});
router.afterEach(() => {
    NProgress.done();
});
export default router
