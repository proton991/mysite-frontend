// import router from './index'
// import {getToken} from "@/utils/sessionUtil";
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' // progress bar style
//
// const whiteList = ['/login', '/', '/aboutMe', '/contactMe', '/articles'];
// router.beforeEach(async(to, from, next) => {
//     NProgress.start();
//     // eslint-disable-next-line no-debugger
//     debugger
//     document.title = to.meta.title;
//
//     const hasToken = getToken();
//
//     if (hasToken) {
//         if (to.path === '/login') {
//             next({ path : '/'});
//             NProgress.done();
//         } else {
//             next()
//         }
//     } else {
//         if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/articles')) {
//             next();
//         } else {
//             next('/login');
//             NProgress.done();
//         }
//     }
//
// });
// router.afterEach(() => {
//    NProgress.done();
// });
