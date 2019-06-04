<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-view></router-view>
        <div>
            footer
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>