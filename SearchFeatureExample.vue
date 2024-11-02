<template>
    <div>
      <AdminNavbar />
      <div class="container">
        <!-- Content -->
        <div class="row mt-4">
          <!-- Showing toast message  -->
          <Toast />
          <div class="search-section mb-3">
            <input type="text" v-model="searchQuery" placeholder="Search posts..." class="form-control">
          </div>
          <hr>
          <div class="row">
          <div v-if="filtermyPosts.length > 0">
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <div v-for="post in filtermyPosts" :key="post.id" class="col">
                <div class="card">
                  <img :src="'data:image/jpeg;base64,' + post.image" class="card-img-top" alt="mark profile pic">
                  <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">{{ post.desc }}</p>
                    <div v-if="post.type==0" class="row">
                      <div class="col">
                        <a href="#" class="btn btn-primary" @click="getDashboardDataUpdate(post.id, 'flagP')">Flag</a>
                      </div>
                      <div class="col">
                        <a href="#" class="btn btn-danger" @click="getDashboardDataUpdate(post.id, 'deleteP')">Delete</a>
                      </div>
                    </div>
                    <div v-else>
                      <span class="trademark">Powered by Sponsor™</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No posts available for the search query {{ searchQuery }}.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Toast from 'primevue/toast';
  import axios from 'axios';
  import AdminNavbar from "../components/AdminNavbar.vue";
  export default {
    name: "AdminCamp",
    components: {
      AdminNavbar,
      Toast
    },
    data() {
      return {
        myPosts: [],
        searchQuery: '',
        myModal: null
      };
    },
    methods: {
      async getDashboardDataUpdate(id, action) {
              try {
                  const response = await axios.put(`http://127.0.0.1:5000/api/admin/update/${id}`, {
                      action: action
                  }, {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                      }
                  });
                  const data = await response.data;
                  if (response.status === 200) {
                      this.$toast.add({ severity: 'info', summary: 'Info', detail: data.msg, life: 3000 });
                      console.log("Dashboard data: ", data);
                  } else {
                      this.$toast.add({ severity: 'info', summary: 'Info', detail: data.error, life: 3000 });
                      console.error("Failed to fetch dashboard data: ", data.error);
                  }
              } catch (error) {
                  console.error("Error fetching dashboard data: ", error);
              }
          },
  
          async fetchMyPosts() {
              try {
                  const response = await fetch("http://127.0.0.1:5000/api/admin/update/dashboard/post", {
                      method: 'GET',
                      headers: {
                          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                      },
                  });
  
                  if (response.status === 200) {
                      const data = await response.json();
                      console.log(data, 'data');
                      this.myPosts = data.data;
                  } else {
                      alert("Something went wrong!");
                  }
              } catch (error) {
                  console.error("Error fetching my posts:", error);
              }
          }
    },
    
    computed: {
      filtermyPosts() {
        return this.myPosts.filter(post =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          post.desc.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    mounted() {
      this.fetchMyPosts();
    },
  };
  </script>
  
  <style></style>