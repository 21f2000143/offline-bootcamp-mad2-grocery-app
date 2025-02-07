<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Sign up</h5>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" required>
          <div v-if="message" class="alert alert-warning">
            {{ message }}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Your Name</label>
          <input type="text" v-model="name" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control">
        </div>
        <div class="mb-3">
          <select class=" input is-large" v-model="role" required>
            <option class="input is-large" value="user">User</option>
            <option class="input is-large" value="manager">Manager</option>
          </select>
        </div>
        <button type="submit" class="btn btn-outline-primary">Sign up</button>
      </form>
    </template>
  </FormCompo>
</template>

<script>

import FormCompo from '../components/FormCompo.vue';
import home from '../utils/navigation.js';
export default {
  name: 'LoginPage',
  components: {
    FormCompo
  },
  data() {
    return {
      email: '',
      name: '',
      password: '',
      role: '',
      message: ''
    }
  },
  methods: {
    home() {
      home(this.$store, this.$route, this.$router);
    },
    async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:5000/signup', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "email": this.email,
            "name": this.name,
            "password": this.password,
            "role": this.role
          }),
        });
        if (response.ok) {
          const data = await response.json();
          alert("User created successfully");
          if (this.$route.path != '/login') {
            this.$router.push('/login')
            this.home()
          }
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (error) {
        alert(error);
      }
    },
  }
}
</script>