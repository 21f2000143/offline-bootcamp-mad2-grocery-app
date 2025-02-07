<template>
  <div class="container">
    <div class="row">
      <!-- Repeat the following structure for each manager -->
      <div class="col-md-4">
        <div v-for="item in this.$store.state.managers" :key="item.id" class="manager-profile">
          <!-- Profile Icon -->
          <img :src="'data:image/jpeg;base64,' + item.image" alt="Manager Profile" class="profile-icon">

          <!-- Basic Info -->
          <div class="basic-info">
            <p>{{ item.email }}</p>
            <p>Date of Joining: {{ item.doj }}</p>
            <p>Years of Service: {{ item.exp }}</p>
          </div>
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="btn btn-danger" @click="deletemanager(item.id)">Delete</button>
            <button class="btn btn-warning" @click="warn">Send Warning</button>
          </div>
        </div>
        <div v-if="this.$store.state.managers.length == 0">
          <h5>No Managers Found</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { deleteManager } from '../services/apiServices';
export default {
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
    warn() {
      if (this.$route.path != '/admin/warning') {
        this.$router.push('/admin/warning')
      }
    },
    async deletemanager(id) {
      if (confirm("Are you sure?")) {
        try {
          const data = await deleteManager(id);
          this.$store.commit('deleteManager', data.resource)
        } catch (error) {
          console.error(error.msg);
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchManagers')
  }
}
</script>