import Vuex from 'vuex'
import Vue from 'vue'
import { app } from './app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        layout: localStorage.getItem('token') ? 'app' : 'public',
        user: {
            token: localStorage.getItem('token')
        },
        loginAttemptMessage: false
    },
    mutations: {
        setLayout (state, layout) {
            state.layout = layout
        },
        setToken (state, token) {
            state.user.token = token
            if (token) {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
            } else {
                localStorage.removeItem('token')
                axios.defaults.headers.common['Authorization'] = ''
            }
        },
        setLoginAttemptMessage (state, message) {
            state.loginAttemptMessage = message
        }
    },
    actions: {
        login ({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/login',
                    data: data,
                    method: 'POST'
                }).catch(err => {
                    if (err.response.status === 401) {
                        commit('setLoginAttemptMessage', 'Authentication failed')
                    }
                    reject(err)
                }).then(resp => {
                    let token = resp.data.success.token
                    commit('setToken', token)
                    commit('setLayout', 'app')
                    commit('setLoginAttemptMessage', '')
                    resolve(resp);
                })
            })
        },
        logout ( {commit} ) {
            commit('setToken', false)
            commit('setLayout', 'public')
        }
    },
    getters: {
        layout: state => state.layout,
        user: state => state.user,
        loginAttemptMessage: state => state.loginAttemptMessage
    }
})