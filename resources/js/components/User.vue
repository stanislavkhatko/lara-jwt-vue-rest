<script>
import {appStore} from "../store/app.js";
import {usersStore} from "../store/users.js";
import {mapState} from "pinia";

export default {
    name: "User",
    data() {
        return {
            errorMessage: '',
        }
    },
    computed: {
        ...mapState(usersStore, ['editedUser']),
        user: {
            get() {
                return usersStore().editedUser;
            },
            set(newValue) {
                usersStore().actionMutateEditedUser(newValue);
            },
        },
    },
    beforeMount() {
        if (this.$route.params.id !== 'new') {
            usersStore().actionGetUser(this.$route.params.id)
        }
    },
    methods: {
        appStore,
        submit() {
            // TODO add proper error handling

            this.errorMessage = '';

            if (this.editedUser.id) {
                usersStore().actionUpdateUser().catch(err => {
                    console.log(err);
                    this.errorMessage = err.response.data.error
                })
            } else {
                usersStore().actionStoreUser().catch(err => {
                    console.log(err);
                    this.errorMessage = err.response.data.error
                })
            }
        }
    }
}
</script>

<template>

    <v-container fluid>
        <v-btn prepend-icon="mdi-arrow-left" @click="$router.push('/users')" variant="text" color="primary">Back</v-btn>

        <v-sheet class="mx-auto" max-width="300">

            <v-form validate-on="submit lazy" @submit.prevent="submit">

                <v-text-field
                    v-model="user.name"
                    label="User name"
                    placeholder="Type the name"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="user.email"
                    name="email"
                    label="User email"
                    type="text"
                    placeholder="email"
                    required
                ></v-text-field>

                <v-text-field
                    v-if="!user.id"
                    v-model="user.password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Type password"
                    required
                ></v-text-field>

                <div class="red--text"> {{ errorMessage }}</div>

                <v-btn
                    :loading="appStore().preloader"
                    class="mt-2"
                    text="Submit"
                    type="submit"
                    block
                ></v-btn>
            </v-form>
        </v-sheet>
    </v-container>

</template>

<style scoped>

</style>
