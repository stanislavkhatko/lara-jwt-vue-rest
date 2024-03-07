<script>
import {mapActions, mapState} from "pinia";
import {usersStore} from "../store/users.js";

export default {
    name: "Users",
    data() {
        return {
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Email', value: 'email'},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
        }
    },
    mounted() {
        this.actionGetUsers();
    },
    methods: {
        ...mapActions(usersStore, ['actionGetUsers', 'actionDeleteUser']),
        editUser(user) {
            // Implement edit functionality
            this.$router.push({name: 'user', params: {id: user.id}})
        },
        deleteUser(user) {
            if (window.confirm(`Remove user ${user.email}?`)) this.actionDeleteUser(user.id).then(() => {
                // TODO add success notification
            })
        }
    },
    computed: {
        ...mapState(usersStore, ['users'])

    }
}
</script>

<template>

    <v-container fluid>
        <v-container>
            <v-btn @click="$router.push('/users/new')" prepend-icon="mdi-plus">Add user</v-btn>
            <v-data-table
                :headers="headers"
                :items="users"
                item-key="id"
                :search="search"
            >
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex">
                        <v-icon small icon="mdi-pencil" @click="editUser(item)"></v-icon>
                        <v-icon small icon="mdi-delete" @click="deleteUser(item)"></v-icon>
                    </div>
                </template>
            </v-data-table>
        </v-container>
    </v-container>

</template>

<style scoped>

</style>
