<template>
    <div>
        <header class="bg-success text-white text-center py-3">
            <h1>Welcome to Eat Fresh</h1>
        </header>

        <div class="container text-center">
            <h2>Explore a World of Freshness</h2>
            <p class="lead">Discover a wide range of fresh and quality groceries delivered to your doorstep.</p>
            <p class="lead">Start your shopping journey now!</p>

            <!-- Visit Now Button with Tooltip -->
            <Button v-tooltip.bottom="{ value: 'Please login or register to continue.' }" label="Visit Now" />
            <!-- Login and Register Buttons -->
            <div class="mt-3">
                <a class="btn btn-outline-dark btn-sm" @click="login">Login</a>
                <a class="btn btn-outline-dark btn-sm" @click="register">Register</a>
            </div>
        </div>
        <section class="container">
        </section>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$router.push('/login');
        },
        register() {
            this.$router.push('/register');
        }
    }
}
</script>