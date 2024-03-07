<template>
    <v-app>
        <v-navigation-drawer permanent>
        <v-list>
            <v-list-item class="px-2 d-flex justify-center">
                <v-avatar :image="`https://placehold.co/600x400?text=${user.name || user.email }`" size="80"></v-avatar>
            </v-list-item>

            <v-list-item>
                <v-list-item-title class="text-h6">
                    {{ `Hi, ${user.name}` }}
                </v-list-item-title>
                <v-list-item-title class="text-primary">
                    {{ user.email }}
                </v-list-item-title>

                <v-list-item-subtitle class="cursor-pointer" v-on:click="logout">log out</v-list-item-subtitle>

            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list-item to="/users">
            <v-list-item-title>Users</v-list-item-title>
        </v-list-item>

    </v-navigation-drawer>

        <v-main>
            <v-toolbar color="primary" dark fixed app>
                <v-toolbar-title>User management dashboard</v-toolbar-title>
            </v-toolbar>

            <router-view></router-view>
        </v-main>

    </v-app>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {authStore} from "../store/auth.js";
import Users from "./Users.vue";

export default {
    components: {Users},
    data() {
        return {
            items: [
                {title: 'Users'},
            ],
        }
    },
    computed: {
        ...mapState(authStore, ['user'])
    },
    beforeMount() {
        authStore().actionGetUser()
    },
    methods: {
        ...mapActions(authStore, ['actionLogout']),
        logout() {
            authStore().actionLogout().then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>
