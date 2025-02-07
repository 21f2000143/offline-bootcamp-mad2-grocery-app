<template>
  <div class="container mt-5">
    <div class="row item-container">
      <!-- Item 1 -->
      <div v-for="(item, index) in this.$store.state.orders" :key="index" class="col-md-4">
        <div class="item">
          <img :src="'data:image/jpeg;base64,' + item.image" alt="item.product_name" class="product-image">
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: &#8377; {{ item.total }}</p>
          <button class="btn btn-success buy-again-btn" disabled>{{ item.order_date }}</button>
          <div v-if="item.rate > 0" class="star-rating">
            <FontAwesomeIcon v-for="n in item.rate" :key="n" :icon="['fas', 'star']" />
          </div>
          <div v-else class="star-rating pointer-on-hover">
            <FontAwesomeIcon v-for="n in 5" :key="n" @click="rate(item.id, n)" :icon="['far', 'star']" />
          </div>
        </div>
      </div>
      <div v-if="this.$store.state.orders.length == 0" class="col-md-12">
        <h5>No Orders Found</h5>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { rate } from '../services/apiServices';
export default {
  methods: {
    async rate(id, value) {
      try {
        const data = await rate(id, value);
        this.$store.commit('updateOrder', data.resource)
      } catch (error) {
        console.error(error.msg);
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchOrders')
  }
}
</script>