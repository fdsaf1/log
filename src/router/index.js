import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
// import Login from 'pages/login'
import { enquireRouter } from './enquire';
import { queryRouter } from './query';
import { manageRouter } from './manage';

const Login = r => require.ensure([], () => r(require('pages/login')));

Vue.use(Router)

export const router = new Router({
    linkActiveClass: 'activated',
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        enquireRouter,
        queryRouter,
        manageRouter,
        {
            path: '/',
            redirect: '/enquire/distribution'
        },
        {
            path: '**',
            component: Hello
        }
    ]
});

router.afterEach((to, from, next) => {
    let key = to.fullPath.match(/\/([^\/]*)\//) && to.fullPath.match(/\/([^\/]*)\//)[1];
    if (!key) {
        return;
    }
    let app = this.a.app;
    app.$store.dispatch('selectSuperNavBar', { key })
});

router.beforeEach((to, from, next) => {
    let key = to.fullPath.match(/\/([^\/]*)\//) && to.fullPath.match(/\/([^\/]*)\//)[1];

    let app = this.a.app,
        name, value, tag;
    next();
    // app.$store.dispatch('getCurrentUserPermissions').then((authorizes) => {
    //     //提取授权信息
    //     for (name in authorizes) {
    //         //判断该模块下是否涉及授权
    //         if (name.indexOf(key) >= 0) {
    //             //授权通过
    //             if (authorizes[name]) {
    //                 next();
    //                 break;
    //             } else {
    //                 next(false);
    //                 break;
    //             }
    //         }
    //     }
    // }).catch(() => {
    //     next(false);
    // });
});