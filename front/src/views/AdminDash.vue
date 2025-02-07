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
        <a class="nav-link pointer-on-hover" @click="managers">Managers</a>
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
    <template v-slot:edit="{ categoryId }">
      <a class="pointer-on-hover" @click="editCat(categoryId)">edit</a>
    </template>
  </DashCompo>
</template>

<script>
import DashCompo from './DashCompo.vue'
export default {
  name: 'AdminDash',
  components: {
    DashCompo
  },
  data() {
    return {
      picUpdate: false,
      profilePic: null,
      query: '',
    };
  },
  methods: {
    createCat() {
      if (this.$route.path != '/admin/cat/create') {
        this.$router.push('/admin/cat/create')
      }
    },
    editCat(id) {
      if (this.$route.path != '/admin/cat/edit/' + id) {
        this.$router.push('/admin/cat/edit/' + id)
      }
    },
    createPro() {
      if (this.$route.path != '/admin/pro/create') {
        this.$router.push('/admin/pro/create')
      }
    },
    managers() {
      if (this.$route.path != '/admin/managers') {
        this.$router.push('/admin/managers')
      }
    },
    notifi() {
      if (this.$route.path != '/admin/notifications') {
        this.$router.push('/admin/notifications')
      }
    },
    async logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      if (this.$route.path != '/') {
        this.$router.push('/')
      }
    },
    stats() {
      if (this.$route.path != '/admin/report') {
        this.$router.push('/admin/report')
      }
    }
  },
  mounted() {
    const source = new EventSource("http://127.0.0.1:5000/stream");
    source.addEventListener(
      "notifyadmin",
      (event) => {
        let data = JSON.parse(event.data);
        alert(data.message);
      },
      false
    );
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchNoti');
  }
}
</script>

<style scoped></style>