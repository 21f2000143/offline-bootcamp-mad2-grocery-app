<template>
  <DashCompo>
    <template v-slot:menu>
      <li class="nav-item">
        <a class="nav-link pointer-on-hover" @click="orders">Your Orders</a>
      </li>
      <li class="nav-item">
        <a class="nav-link pointer-on-hover" @click="shareViaWhatsApp">Refer</a>
      </li>
    </template>
    <template v-slot:icon>
      <a @click="cart" class="nav-link pointer-on-hover ms-auto position-relative">
        <!-- Badge for cart items -->
        <FontAwesomeIcon :icon="['fas', 'shopping-cart']" style="font-size: 1.5rem; color: white;" />
        <span v-show="this.$store.state.cart.length > 0"
          class="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {{ this.$store.state.cart.length }}
        </span>
      </a>
    </template>
  </DashCompo>
</template>

<script>
import DashCompo from './DashCompo.vue'
export default {
  components: {
    DashCompo
  },
  methods: {
    notifi() {
      if (this.$route.path != "/user/notifications") {
        this.$router.push("/user/notifications");
      }
    },
    cart() {
      if (this.$route.path != "/user/CartCompo") {
        this.$router.push("/user/CartCompo");
      }
    },
    orders() {
      if (this.$route.path != "/user/your/orders") {
        this.$router.push("/user/your/orders");
      }
    },
    shareViaWhatsApp() {
      // Replace 'your_share_message' with the message you want to share
      const message = encodeURIComponent(
        "Check out this amazing app! Join now."
      );

      // Replace 'your_web_url' with the URL of your web application
      const url = encodeURIComponent("http://127.0.0.1:5000/");

      // Construct the WhatsApp share URL
      const whatsappUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;

      // Open a new window with the WhatsApp share URL
      window.open(whatsappUrl, "_blank");
    }
  },
  mounted() {
    const source = new EventSource("http://127.0.0.1:5000/stream");
    source.addEventListener(
      this.$store.state.authenticatedUser.email,
      (event) => {
        let data = JSON.parse(event.data);
        alert(data.message);
      },
      false
    );
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch('fetchNoti');
    this.$store.dispatch('fetchCartItems');
  }
}
</script>
