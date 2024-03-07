import { defineStore } from 'pinia'
import axios from 'axios'
import _axios from "../plugins/axios.js";


export const usersStore = defineStore({
    id: 'users',
    state: () => ({
        users: [],
        editedUser: {},
    }),
    actions: {
        actionGetUsers() {
            return _axios.get('api/users', {_preloader: true}).then(resp => {
                this.users = resp.data
            })
        },
        actionGetUser(id) {
            return _axios.get(`api/users/${id}`, {_preloader: true}).then(resp => {
                this.editedUser = resp.data
            })
        },
        actionUpdateUser() {
            return _axios.put(`api/users/${this.editedUser.id}`, this.editedUser, {_preloader: true}).then(resp => {
                this.editedUser = resp.data

                return resp.data;
            })
        },
        actionStoreUser() {
            return _axios.post(`api/users`, this.editedUser, {_preloader: true}).then(resp => {
                this.editedUser = resp.data

                return resp.data
            })
        },
        actionDeleteUser(id) {
            return _axios.delete(`api/users/${id}`, {_preloader: true}).then(resp => {
                this.users = this.users.filter(u => u.id !== id)
            })
        },
        actionMutateEditedUser(updatedUser) {
            this.editedUser = { ...this.editedUser, ...updatedUser };
        },
    },
})
