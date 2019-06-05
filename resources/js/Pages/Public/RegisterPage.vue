<template>
    <div>
        <form @submit.prevent="registerAttempt" action="">
            <div>{{ errors.first('full_name') }}</div>
            <input v-model="name"
                   v-validate="'required'"
                   name="full_name"
                   data-vv-validate-on="none"
                   type="text"
                   placeholder="Full Name">
            <div>{{ errors.first('email') }}</div>
            <input v-model="email"
                   v-validate="'required|email'"
                   name="email"
                   data-vv-validate-on="none"
                   type="text"
                   placeholder="Email">
            <div>{{ errors.first('password') }}</div>
            <input v-model="password"
                   v-validate="'required|min:6'"
                   name="password"
                   data-vv-validate-on="none"
                   type="password">
            <div>{{ errors.first('confirmation_password') }}</div>
            <input v-model="c_password"
                   v-validate="'required|confirmed:password'"
                   name="confirmation_password"
                   data-vv-validate-on="none"
                   type="password">
            <input type="submit" value="Register">
            <div v-if="registerAttemptMessage">{{ registerAttemptMessage }}</div>
        </form>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data: function() {
            return {
                name: '',
                email: '',
                password: '',
                c_password: ''
            }
        },
        computed: {
            ...mapGetters(['registerAttemptMessage'])
        },
        methods: {
            ...mapActions(['register']),
            async registerAttempt() {
                let isValid = await this.$validator.validateAll()
                if (isValid) {
                    try {
                        await this.register({
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            c_password: this.c_password
                        })
                        this.$router.push({path: '/app'})
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }
</script>
