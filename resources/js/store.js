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
        loginAttemptMessage: false,
        registerAttemptMessage: false,
        projects: []
    },
    mutations: {
        setLayout (state, layout) {
            state.layout = layout
        },
        setToken (state, token) {
            state.user.token = token
            if (token) {
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            } else {
                localStorage.removeItem('token')
                axios.defaults.headers.common['Authorization'] = ''
            }
        },
        setLoginAttemptMessage (state, message) {
            state.loginAttemptMessage = message
        },
        setRegisterAttemptMessage (state, message) {
            state.registerAttemptMessage = message
        },
        setProjects (state, payload) {
            state.projects = payload
        },
        setProject (state, payload) {
            let projects = _.clone(state.projects)
            let projectIndex = projects.findIndex((proj) => proj.id === payload.id)
            projects[projectIndex] = payload
            state.projects = projects
        },
        putField (state, payload) {
            let projects = _.clone(state.projects)
            let projectIndex = projects.findIndex((proj) => proj.id === payload.projectId)
            projects[projectIndex].fields.push({
                'key': payload.key,
                'value': payload.value
            })
            state.projects = projects
        }
    },
    actions: {
        register ({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/register',
                    data: data,
                    method: 'POST'
                }).then(resp => {
                    let token = resp.data.success.token
                    commit('setToken', token)
                    commit('setLayout', 'app')
                    commit('setRegisterAttemptMessage', '')
                    resolve(resp);
                }).catch(err => {
                    let statusCode = err.response.status
                    let responseData = err.response.data
                    if (statusCode === 401) {
                        commit('setRegisterAttemptMessage', 'Registration failed')
                    }
                    else if (statusCode === 422) {
                        if (typeof responseData.errors.email !== 'undefined') {
                            commit('setRegisterAttemptMessage', responseData.errors.email[0])
                        }
                        else {
                            commit('setRegisterAttemptMessage', 'Invalid data for registration')
                        }
                    } else {
                        commit('setRegisterAttemptMessage', 'Registration failed')
                    }
                    reject(err)
                })
            })
        },
        login ({commit}, data) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/login',
                    data: data,
                    method: 'POST'
                }).then(resp => {
                    let token = resp.data.success.token
                    commit('setToken', token)
                    commit('setLayout', 'app')
                    commit('setLoginAttemptMessage', '')
                    resolve(resp);
                }).catch(err => {
                    if (err.response.status === 401) {
                        commit('setLoginAttemptMessage', 'Authentication failed')
                    }
                    reject(err)
                })
            })
        },
        logout ( {commit} ) {
            commit('setToken', false)
            commit('setLayout', 'public')
        },
        fetchProjects ({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/projects',
                    method: 'GET'
                }).then(resp => {
                    commit('setProjects', resp.data)
                    resolve(resp);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateProject({commit}, project) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/projects/' + project.id,
                    data: project,
                    method: 'PUT'
                }).then(resp => {
                    commit('setProject', project)
                    resolve(resp);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        putField({commit}, field) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'api/projects/' + field.projectId + '/fields',
                    data: field,
                    method: 'POST'
                }).then(resp => {
                    commit('putField', field)
                    resolve(resp);
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        layout: state => state.layout,
        user: state => state.user,
        loginAttemptMessage: state => state.loginAttemptMessage,
        registerAttemptMessage: state => state.registerAttemptMessage,
        projects: state => state.projects,
    }
})