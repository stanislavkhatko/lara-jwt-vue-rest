import {defineStore} from 'pinia'
import _axios from "../plugins/axios.js";

export const authStore = defineStore({
    id: 'authStore',
    state: () => ({
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        error: '',
    }),
    actions: {
        actionSetAuth(user, access_token) {

            if (access_token) {
                const token = 'Bearer ' + access_token
                authStore().token = token

                localStorage.setItem('token', token)
                _axios.defaults.headers.common.Authorization = token
            }

            authStore().user = user;
        },
        actionLogin(data) {
            return _axios.post('api/auth/login', data, {_preloader: true}).then(resp => {
                this.actionSetAuth(resp.data.user, resp.data.access_token)
            })
        },
        actionRegister(user) {
            return _axios.post('api/auth/register', user, {_preloader: true}).then(resp => {
                this.actionSetAuth(resp.data.user, resp.data.access_token)
            })
        },
        actionLogout() {
            return new Promise((res) => {
                localStorage.removeItem('token')

                authStore().token = '';
                authStore().user = {}

                res()
            })
        },

        actionGetUser() {
            return _axios({url: 'api/user'}).then(res => {
                this.actionSetAuth(res.data)
            })
        }
    },
    getters:
        {
            isLoggedIn: state => !!state.token,
            authStatus:
                state => state.status,
            getUser:
                state => state.user,
            getError:
                state => state.error
        }
})
