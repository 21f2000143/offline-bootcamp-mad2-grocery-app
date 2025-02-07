<template>
  <div class="row justify-content-center m-3 text-color-light">
    <div class="card bg-light" style="width: 36rem;">
      <div class="card-body">
        <div class="d-flex justify-content-end">
          <button type="button" class="btn-close" aria-label="Close" @click="closeCard"></button>
        </div>
        <h5 class="card-title">Send Warning</h5>
        <form @submit.prevent="sendWarning" enctype="multipart/form-data">
          <label class="form-label" for="message">message:</label>
          <textarea class="form-control" v-model="message" type="text" id="message" name="message" required></textarea>
          <br>
          <label class="form-label" for="Select Manager">Select Manager:</label>
          <select class="form-select" name="Select Category" id="Select Manager" v-model="managers.email" required>
            <option v-for="manager in managers" :key="manager.id" :value="manager.email">{{ manager.email }}</option>
          </select>
          <br>
          <input type="submit" class="btn btn-outline-primary" value="Send">
        </form>
      </div>
    </div>
  </div>
</template>

<script type="module">
import home from '../utils/navigation.js';
import { fetchWarnings, sendWarning } from '../services/apiServices';
export default {
  data() {
    return {
      managers: {
        id: '',
        name: '',
        email: '',
      },
      message: ''
    }
  },
  methods: {
    closeCard() {
      home(this.$store, this.$route, this.$router);
    },
    async fetchWarnings() {
      try {
        const data = await fetchWarnings()
        this.managers = data
      } catch (error) {
        console.error(error.msg);
      }
    },
    async sendWarning() {
      if (confirm("Are you sure?")) {
        try {
          const data = await sendWarning();
          this.closeCard()
        } catch (error) {
          console.error(error.msg);
        }
      }
    }
  },
  mounted() {
    this.fetchManagers()
  }
}
</script>