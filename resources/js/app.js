require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router'
import { routes } from './routes'
import VeeValidate from 'vee-validate';
import Axios from 'axios'
import 'es6-promise/auto'
import store from './store'

if (store.getters.user.token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters.user.token
}
axios.defaults.baseURL = process.env.MIX_APP_URL

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes,
})

// TODO refactor routing
router.beforeEach((to, from, next) => {
    const publicPages = [
        '/login',
        '/register',
        '/'
    ]

    const authRequired = !publicPages.includes(to.path)
    if (authRequired && !store.getters.user.token) {
        console.log('not authenticated')
        return next('/login');
    }
    if (to.path === '/' && store.getters.user.token) {
        return next('/app')
    }
    next();
})

Vue.use(VeeValidate)

Vue.component('public-layout', require('./Layouts/PublicLayout.vue').default);
Vue.component('app-layout', require('./Layouts/AppLayout.vue').default);

import { mapGetters } from 'vuex'

const app = new Vue({
    el: '#app',
    router,
    store,
    computed: {
        ...mapGetters(['layout'])
    }
})

export { app }
