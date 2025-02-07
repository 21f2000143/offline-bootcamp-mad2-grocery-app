<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Add Category</h5>
      <form @submit.prevent="updatecategory">
        <div class="mb-3">
          <label for="name" class="form-label">Category Name</label>
          <input type="text" class="form-control" v-model="name" required>
          <div v-if="message" class="alert alert-warning">
            {{ message }}
          </div>
        </div>
        <div class="d-flex">
          <button type="submit" class="btn btn-outline-primary me-5">Update</button>
          <a class="btn btn-outline-danger" @click="deletecategory">Delete</a>
        </div>
      </form>
    </template>
  </FormCompo>
</template>

<script>
import FormCompo from './FormCompo.vue';
import home from '../utils/navigation';
import { updateCategory, fetchCategory, deleteCategory } from '../services/apiServices';
export default {
  name: 'EditCatCompo',
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
    async fetchcategory() {
      try {
        const data = await fetchCategory(this.$route.params.id);
        console.log(data);
        this.name = data.name;
      } catch (error) {
        console.error(error);
      }
    },
    async updatecategory() {
      if (confirm("Are you sure?")) {
        try {
          const data = await updateCategory(this.$route.params.id, this.name);
          if (this.$store.state.authenticatedUser.role === 'admin') {
            this.$store.commit('updateCategory', data.resource);
          }
          else {
            this.$store.commit('addNoti', data.resource)
          }
          this.home();
        } catch (error) {
          console.error(error);
        }
      }
    },
    async deletecategory() {
      if (confirm("Are you sure?")) {
        try {
          const data = await deleteCategory(this.$route.params.id);
          if (this.$store.state.authenticatedUser.role === 'admin') {
            this.$store.commit('deleteCategory', data.resource.id);
          }
          else {
            this.$store.commit('addNoti', data.resource)
          }
          this.home();
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  mounted() {
    this.fetchcategory()
  }
}
</script>