<template>
    <div class="row justify-content-center m-3">
        <div class="card bg-light" style="width: 18rem;">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <!-- Cross button to close the card -->
                    <button type="button" class="btn-close" aria-label="Close" @click="closeCard"></button>
                </div>
                <h5 class="card-title">Sign In</h5>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1">
                        <div v-if="message" class="alert alert-warning">
                            {{ message }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <button type="submit" class="btn btn-outline-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            name: '',
            password: '',
            role: '',
            remember: '',
            message: ''
        }
    },

    methods: {
        closeCard() {
            this.$router.push('/');
        },
        async submitForm() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/login', {
                    email: this.email,
                    password: this.password
                },
                    {
                        withCredentials: true,
                    }
                )
                console.log(response)
                if (!response.status == 200) {
                    alert(response.data.error);
                    throw new Error(response.data.error);
                }
                else {
                    alert('Login success!');
                    this.$router.push('/admin');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                // Optionally, notify the user or perform other error-handling actions
            }
        },
    }
}
</script>