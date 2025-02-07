<template>
  <div class="row justify-content-center m-3">
    <div class="card bg-light" style="width: 45rem;">
      <div class="card-body">
        <div class="d-flex justify-content-end">
          <!-- Cross button to close the card -->
          <button type="button" class="btn-close" aria-label="Close" @click="home"></button>
        </div>
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<script type="module">
import home from '../utils/navigation';
export default {
  name: 'FormCompo',
  methods: {
    home() {
      home(this.$store, this.$route, this.$router);
    }
  }
}
</script>