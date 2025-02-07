<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Add Category</h5>
      <form @submit.prevent="addcategory">
        <div class="mb-3">
          <label for="name" class="form-label">Category Name</label>
          <input type="text" class="form-control" v-model="name" required>
          <div v-if="message" class="alert alert-warning">
            {{ message }}
          </div>
        </div>
        <button type="submit" class="btn btn-outline-primary">Add</button>
      </form>
    </template>
  </FormCompo>
</template>

<script type="module">
import FormCompo from './FormCompo.vue';
import { addCategory } from '../services/apiServices';
export default {
  name: 'CreateCatCompo',
  components: {
    FormCompo
  },
  data() {
    return {
      name: '',
      message: ''
    }
  },
  methods: {
    home() {
      home(this.$store, this.$route, this.$router);
    },
    async addcategory() {
      try {
        const response = await addCategory(this.name);
        this.$store.commit('addCat', response.data.resource);
        this.home();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>