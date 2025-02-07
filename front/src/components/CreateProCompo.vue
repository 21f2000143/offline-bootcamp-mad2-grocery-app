<template>
  <FormCompo>
    <template v-slot:form>
      <h5 class="card-title">Add Product</h5>
      <form @submit.prevent="addProduct" enctype="multipart/form-data">
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

        <label class="form-label" for="rpu">Rate Per Unit:</label>
        <input class="form-control" v-model="product.rpu" type="number" id="rpu" name="rpu" step="0.01" required>
        <br>

        <label class="form-label" for="description">description:</label>
        <textarea class="form-control" v-model="product.description" type="text" id="description" name="description"
          required></textarea>
        <br>
        <label class="form-label" for="Select Category">Select Category:</label>
        <select class="form-select" name="Select Category" id="Select Category" v-model="product.category_id" required>
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
        <input type="submit" class="btn btn-outline-primary" value="Add Product">
      </form>
    </template>
  </FormCompo>
</template>

<script type="module">
import FormCompo from './FormCompo.vue';
import { addProduct } from '../services/apiServices';
export default {
  name: 'CreateProCompo',
  components: {
    FormCompo
  },
  data() {
    return {
      product: {
        name: '',
        quantity: 0,
        manufacture: '',
        expiry: '',
        rpu: 0,
        unit: '',
        description: '',
        image: null,
        category_id: ''
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.product.image = event.target.files[0];
    },
    async addProduct() {
      try {
        const response = await addProduct(this.name, this.quantity, this.manufacture, this.expiry, this.rpu, this.unit,
          this.description, this.image, this.category_id);
        if (this.$store.state.authenticatedUser.role === 'admin') {
          this.$store.commit('addProduct', data.resource)
        }
        else {
          this.$store.commit('addNoti', data.resource)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>