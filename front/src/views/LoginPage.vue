<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card " style="width: 45rem;">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <!-- Cross button to close the card -->
                    <button type="button" class="btn-close" aria-label="Close" @click="closeCard"></button>
                </div>
                <h5 class="card-title">Sign In</h5>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" v-model="username" class="form-control" id="exampleInputEmail1">
                        <div v-if="message" class="alert alert-warning">
                            {{ message }}
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        login() {
            this.$router.push({ name: 'home' });
        },
        closeCard() {
            this.$router.push('/');
        }
    }
}
</script>