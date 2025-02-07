<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Sign In</h5>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="text" v-model="username" class="form-control" id="exampleInputEmail1">
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
    </template>
  </FormCompo>
</template>

<script>
import FormCompo from '../components/FormCompo.vue';
export default {
  name: 'LoginPage',
  components: {
    FormCompo
  },
  data() {
    return {
      username: '',
      password: '',
      message: ''
    }
  },

  methods: {
    closeCard() {
      this.$router.push('/');
    },
    async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          const data = await response.json();
          console.log(data);
          throw new Error(data.error);
        } else {
          const data = await response.json();
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          console.log(data);
          this.$store.commit('setAuthenticatedUser', data);
          if (data.role === 'doctor') {
            this.$router.push('/doctor');
          }
        }
      } catch (error) {
        alert(error);
      }
    },
  }
}
</script>

