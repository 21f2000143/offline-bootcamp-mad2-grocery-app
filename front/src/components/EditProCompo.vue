<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Update Product</h5>
      <form @submit.prevent="updateproduct" enctype="multipart/form-data">
        <label class="form-label" for="name">Product Name:</label>
        <input class="form-control" v-model="product.name" type="text" id="name" name="name" required>
        <br>

        <label class="form-label" for="quantity">Quantity:</label>
        <input class="form-control" v-model="product.quantity" type="number" id="quantity" name="quantity" required>
        <br>

        <label class="form-label" for="manufacture">Manufacture Date:</label>
        <input class="form-control" v-model="product.manufacture" type="date" id="manufacture" name="manufacture"
          required>
        <br>

        <label class="form-label" for="expiry">Expiry Date:</label>
        <input class="form-control" v-model="product.expiry" type="date" id="expiry" name="expiry" required>
        <br>

        <label class="form-label" for="description">description:</label>
        <textarea class="form-control" v-model="product.description" type="text" id="description" name="description"
          required></textarea>
        <br>

        <label class="form-label" for="rpu">Rate Per Unit:</label>
        <input class="form-control" v-model="product.rpu" type="number" id="rpu" name="rpu" step="0.01" required>
        <br>
        <label class="form-label" for="Select Category">Select Category:</label>
        <select class="form-select" name="Select Category" v-model="product.category_id" required>
          <option v-for="category in this.$store.state.categories" :key="category.id" :value="category.id">
            {{ category.name }}</option>
        </select>
        <label class="form-label" for="unit">Unit:</label>
        <select class="form-select" name="Select Unit" v-model="product.unit" required>
          <option value="l">l</option>
          <option value="ml">ml</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="m">m</option>
          <option value="cm">cm</option>
          <option value="inch">inch</option>
          <option value="piece">piece</option>
          <option value="dozen">dozen</option>
        </select>
        <br>

        <label class="form-label" for="image">Image:</label>
        <input class="form-control" type="file" id="image" @change="handleFileUpload" accept="image/*" required>
        <br>
        <div class="d-flex">
          <button type="submit" class="btn btn-outline-primary me-5">Update</button>
          <a class="btn btn-outline-danger" @click="deleteproduct">Delete</a>
        </div>
      </form>
    </template>
  </FormCompo>
</template>

<script type="module">
import FormCompo from './FormCompo.vue';
import { updateProduct, fetchProduct, deleteProduct } from '../services/apiServices';
export default {
  name: 'EditProCompo',
  components: {
    FormCompo
  },
  data() {
    return {
      product: {
        id: '',
        quantity: 0,
        name: '',
        manufacture: '',
        description: '',
        expiry: '',
        rpu: 0,
        unit: '',
        image: null,
        category_id: ''
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0];
    },
    async fetchproduct() {
      try {
        const data = await fetchProduct(this.$route.params.id);
        console.log(data);
        this.product = data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateproduct() {
      if (confirm("Are you sure?")) {
        try {
          const data = await updateProduct(this.$route.params.id, this.name, this.quantity, this.manufacture, this.expiry, this.rpu, this.unit, this.description, this.image, this.category_id);
          if (this.$store.state.authenticatedUser.role === 'admin') {
            this.$store.commit('updateProduct', data.resource);
          }
          else {
            this.$store.commit('addNoti', data.resource)
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    async deleteproduct() {
      if (confirm("Are you sure?")) {
        try {
          const data = await deleteProduct(this.$route.params.id);
          if (this.$store.state.authenticatedUser.role === 'admin') {
            this.$store.commit('deleteProduct', data.resource.id);
          }
          else {
            this.$store.commit('addNoti', data.resource)
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  mounted() {
    this.fetchproduct()
  }
}
</script>