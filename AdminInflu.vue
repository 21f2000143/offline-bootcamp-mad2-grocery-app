<template>
    <div>
        <AdminNavbar />
        <div class="container">
            <!-- Content -->
            <div class="row mt-4">
                <!-- Showing toast message  -->
                <Toast />
                <div class="search-section mb-3">
                    <input type="text" v-model="searchQuery" placeholder="Search Influencer...." class="form-control">
                </div>
                <hr>
                <div class="row">
                    <div v-if="filterMyInfluencers.length > 0">
                        <div v-for="influ in filterMyInfluencers" :key="influ.id" class="row">
                            <div class="col border p-3">
                                <div class="row row-cols-lg-auto g-3 align-items-center">
                                    <div class="col-12">
                                        <label class="visually-hidden"
                                            for="inlineFormInputGroupUsername">Username</label>
                                        <div class="input-group">
                                            <div class="input-group-text">@</div>
                                            <input type="text" class="form-control" id="inlineFormInputGroupUsername"
                                                placeholder="Username" :value="influ.name">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <p>Niche: {{ influ.niche }}</p>
                                    </div>
                                    <div class="col-12">
                                        <p>Reach: {{ influ.reach }}</p>
                                    </div>
                                    <div class="col-12">
                                        <p>Flag:{{ influ.flag }}</p>
                                    </div>

                                    <div class="col-6">
                                        <button class="btn btn-warning"
                                            @click="getDashboardDataUpdate(influ.id, 'flagU')">Flag</button>
                                    </div>
                                    <div v-if="influ.isblock == 0" class="col-6">
                                        <button class="btn btn-danger"
                                            @click="getDashboardDataUpdate(influ.id, 'blockU')">Block</button>
                                    </div>
                                    <div v-if="influ.isblock == 1" class="col-6">
                                        <button class="btn btn-danger"
                                           disabled>Blocked</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>No influ available.</p>
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
    name: "AdminInflu",
    components: {
        AdminNavbar,
        Toast
    },
    data() {
        return {
            myInfluencers: [],
            searchQuery: '',
            username: ''
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

        async fetchMyInfluencers() {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/admin/update/dashboard/influ", {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data, 'data');
                    this.myInfluencers = data.data;
                } else {
                    alert("Something went wrong!");
                }
            } catch (error) {
                console.error("Error fetching my posts:", error);
            }
        }
    },
    computed: {
        filterMyInfluencers() {
            return this.myInfluencers.filter(influ =>
                influ.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        this.fetchMyInfluencers();
        this.username = localStorage.getItem("user");
    },
};
</script>

<style></style>