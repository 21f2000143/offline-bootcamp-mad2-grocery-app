<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Shopping Cart</h2>
    <div class="card">
      <div class="card-body">
        <!-- Cart Items -->
        <div v-for="(item, index) in this.$store.state.cart" :key="index" class="mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">{{ item.product_name }}</h5>
            <p class="mb-0">
              <button class="btn btn-outline-secondary btn-sm" @click="decreaseQuantity(item.id)">-</button>
              {{ item.quantity }}
              <button class="btn btn-outline-secondary btn-sm" @click="increaseQuantity(item.id)">+</button>
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <p class="mb-0">Price: &#8377; {{ item.rpu }}</p>
            <p class="mb-0">Subtotal: &#8377; {{ item.rpu * item.quantity }} </p>
            <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove</button>
          </div>
        </div>
        <!-- Total Amount -->
        <div class="mt-4">
          <h5>Total Amount: {{ totalAmount }}</h5>
        </div>

        <!-- Pay and Confirm Button -->
        <div class="mt-4 text-center">
          <button v-if="this.$store.state.cart.length > 0" class="btn btn-success" @click="payAndConfirm">Pay and
            Confirm</button>
          <button v-else class="btn btn-success" disabled>Pay and Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { increaseQuantity, removeItem, payAndConfirm } from '../services/apiServices';
export default {
  name: 'CartCompo',
  methods: {
    async increaseQuantity(id) {
      try {
        const data = await increaseQuantity(id);
        this.$store.commit("updateToCart", data.resource);
      } catch (error) {
        console.error(error.msg);
      }
    },
    async decreaseQuantity(id) {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/cart/item/decrement/" + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        if (response.status === 201) {
          const data = await response.json();
          console.log(data.resource);
          this.$store.commit("updateToCart", data.resource);
        } else if (response.status === 200) {
          const data = await response.json();
          this.$store.commit("deleteToCart", data.resource);
        } else {
          const data = await response.json();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeItem(id) {
      try {
        const data = await removeItem(id);
        this.$store.commit("deleteToCart", data.resource);
      } catch (error) {
        console.error(error.msg);
      }
    },
    async payAndConfirm() {
      try {
        const data = await payAndConfirm();
        this.$store.commit("setCart", data.resource);
      } catch (error) {
        console.error(error.msg);
      }
    }
  },
  // In your component
  computed: {
    totalAmount() {
      return this.$store.getters.getTotalAmount;
    },
  }
}
</script>