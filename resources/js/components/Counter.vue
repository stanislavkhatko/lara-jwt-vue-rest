<script>
export default {
    name: "Counter"
}
</script>

<template>
    <v-main>
        <!-- Your main content goes here -->
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="users-counter" elevation="5">
                        <v-card-text class="text-center">
                            <div class="headline">Number of users:</div>

                            <div class="display-1 mt-2">{{ userCount }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

</template>

<style scoped>

</style>
