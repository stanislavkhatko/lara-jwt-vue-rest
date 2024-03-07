<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height class="align-center">
                <v-row justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>{{ isRegister ? stateObj.register.name : stateObj.login.name }} form
                                </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <form ref="form" @submit.prevent="isRegister ? register() : login()">
                                    <v-text-field
                                        v-model="email"
                                        name="email"
                                        label="Your email"
                                        type="text"
                                        placeholder="email"
                                        required
                                    ></v-text-field>

                                    <v-text-field v-if="isRegister"
                                                  v-model="name"
                                                  name="name"
                                                  label="Your name"
                                                  type="text"
                                                  required
                                                  placeholder="name"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        placeholder="password"
                                        required
                                    ></v-text-field>

                                    <v-text-field v-if="isRegister"
                                                  v-model="confirmPassword"
                                                  name="confirmPassword"
                                                  label="Confirm Password"
                                                  type="password"
                                                  placeholder="confirm password"
                                                  required
                                    ></v-text-field>
                                    <div class="red--text"> {{ errorMessage }}</div>
                                    <v-btn type="submit" class="mt-4" color="primary" value="log in">
                                        {{ isRegister ? stateObj.register.name : stateObj.login.name }}
                                    </v-btn>
                                    <div class="grey--text mt-4 cursor-pointer"
                                         v-on:click.prevent="isRegister = !isRegister;">
                                        {{ toggleMessage }}
                                    </div>
                                </form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {authStore} from "../store/auth.js";
import {mapActions} from "pinia";

export default {
    name: "App",
    data() {
        return {
            name: "Stan",
            email: "s.a.hatko@gmail.com",
            password: "123456",
            confirmPassword: "123456",
            isRegister: false,
            errorMessage: "",
            stateObj: {
                register: {
                    name: 'Register',
                    message: 'Already have an Account? login.'
                },
                login: {
                    name: 'Login',
                    message: 'Register'
                }
            }
        };
    },
    methods: {
        ...mapActions(authStore, ['actionLogin', 'actionRegister']),

        login() {
            this.actionLogin({email: this.email, password: this.password}).then(() => {
                this.$router.push('/')
            }).catch(err => {
                console.log('err', err)
                if (err.response.data.error) {
                    this.errorMessage = err.response.data.error;
                } else {
                    alert(err)
                }
                // TODO display error properly
            })
            // this.$router.replace({name: "dashboard", params: {username: username}});
        },
        register() {
            if (this.password === this.confirmPassword) {
                this.errorMessage = "";

                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword,
                };

                this.actionRegister(data).then(() => this.$router.push('/')).catch(err => {
                    if (err.response.data.error) {
                        this.errorMessage = err.response.data.error;
                    } else {
                        alert(err)
                    }
                    // TODO display error properly
                })

            } else {
                this.errorMessage = "password did not match"
            }
        }
    },
    computed: {
        toggleMessage: function () {
            return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message
        }
    }
};
</script>
