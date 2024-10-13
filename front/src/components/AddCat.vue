<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card " style="width: 45rem;">
            <div class="card-body">
                <div class="d-flex justify-content-end">
                    <!-- Cross button to close the card -->
                    <button type="button" class="btn-close" aria-label="Close" @click="closeCard"></button>
                </div>
                <h5 class="card-title">Add Category</h5>
                <form @submit.prevent="add">
                    <div class="mb-3">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="password" v-model="name" class="form-control" id="name">
                        </div>
                        <button type="submit" class="btn btn-outline-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'AddCat',
    data() {
        return {
            name: ''
        }
    },

    methods: {
        closeCard() {
            this.$router.push('/');
        },
        async add() {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/login', {
                    name: this.name
                },
                {
                    withCredentials: true,
                    credentials: 'include'
                }
            )
                console.log(response)
                if (!response.status == 200) {
                    alert(response.data.error);
                    throw new Error(response.data.error);
                }
                else {
                    alert('Add success!');
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