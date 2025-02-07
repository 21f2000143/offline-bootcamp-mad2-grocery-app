<template>
  <DashCompo>
    <template v-slot:menu>
      <li class="nav-item">
        <a class="nav-link pointer-on-hover" @click="createCat">Add category</a>
      </li>
      <li class="nav-item">
        <a class="nav-link pointer-on-hover" @click="createPro">Add product</a>
      </li>
      <li class="nav-item">
        <a class="nav-link pointer-on-hover" @click="stats">stats</a>
      </li>
    </template>
    <template v-slot:icon>
      <a @click="notifi" class="nav-link pointer-on-hover ms-auto position-relative">
        <FontAwesomeIcon :icon="['fas', 'bell']" style="font-size: 1.5rem; color: white;" />
        <!-- Badge for cart items -->
        <span v-show="this.$store.state.notifications.length > 0"
          class="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {{ this.$store.state.notifications.length }}
        </span>
      </a>
    </template>
    <template v-slot:edit>
      <a class="pointer-on-hover" @click="editCat(categoryId)">edit</a>
    </template>
  </DashCompo>
</template>

<script>
import DashCompo from './DashCompo.vue'
export default {
  name: 'ManagerDash',
  props: {
    categoryId: Number
  },
  components: {
    DashCompo
  },
  methods: {
    createCat() {
      if (this.$route.path != '/manager/cat/create') {
        this.$router.push('/manager/cat/create')
      }
    },
    editCat(id) {
      if (this.$route.path != '/manager/cat/edit/' + id) {
        this.$router.push('/manager/cat/edit/' + id)
      }
    },
    createPro() {
      if (this.$route.path != '/manager/pro/create') {
        this.$router.push('/manager/pro/create')
      }
    },
    notifi() {
      if (this.$route.path != '/manager/notifications') {
        this.$router.push('/manager/notifications')
      }
    },
    async logout() {
      try {
        const response = await fetch('http://127.0.0.1:5000/logout', {
          method: 'GET',
          headers: {

          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.$store.commit('setAuthenticatedUser', '')
          if (this.$route.path != '/') {
            this.$router.push('/')
          }
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    stats() {
      if (this.$route.path != '/manager/report') {
        this.$router.push('/manager/report')
      }
    }
  },
  mounted() {
    const source = new EventSource("http://127.0.0.1:5000/stream");
    source.addEventListener(
      "notifymanager",
      (event) => {
        let data = JSON.parse(event.data);
        alert(data.message);
      },
      false
    );
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchNoti')
  }
}
</script>