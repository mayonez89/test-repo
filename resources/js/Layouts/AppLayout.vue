<template>
    <div>
        <a @click="logoutAttempt" href="#">Logout</a>
        <router-view></router-view>
        footer
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions(['logout']),
            async logoutAttempt () {
                await this.logout()
                this.$router.push('/')
            }
        }
    }
</script>