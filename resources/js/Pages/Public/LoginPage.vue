<template>
    <div>
        <form @submit.prevent="loginAttempt">
            <div>{{ errors.first('email') }}</div>
            <input v-model="email"
                   v-validate="'required|email'"
                   name="email"
                   data-vv-validate-on="none"
                   type="text"
                   placeholder="Email">
            <div>{{ errors.first('password') }}</div>
            <input v-model="password"
                   v-validate="'required'"
                   name="password"
                   data-vv-validate-on="none"
                   type="password">
            <input type="submit" value="Login">
            <div v-if="loginAttemptMessage">{{ loginAttemptMessage }}</div>
        </form>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
            ...mapGetters(['loginAttemptMessage'])
        },
        methods: {
            ...mapActions(['login']),
            async loginAttempt() {
                let isValid = await this.$validator.validateAll()
                if (isValid) {
                    await this.login({email: this.email, password: this.password})
                    this.$router.push({path: '/app'})
                }
            }
        }
    }
</script>
