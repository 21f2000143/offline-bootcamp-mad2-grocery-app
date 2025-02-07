<template>
  <div>
    <header class="bg-success text-white text-center py-3">
      <h1>Welcome to Clinic360</h1>
    </header>
    <section class="container mt-4">
      <div class="text-center">
        <h2>Find Your Doctor</h2>
        <p class="lead">Book an appointment with doctors and get better care.</p>
        <p class="lead">Start your journey now!</p>

        <!-- Doctor and Patient Buttons with Tooltip -->
        <div class="mt-3">
          <button type="button" class="btn btn-primary btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom"
            title="Please login or register as a doctor to continue.">
            Doctor
          </button>
          <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="tooltip" data-bs-placement="bottom"
            title="Please login or register as a patient to continue.">
            Patient
          </button>
        </div>

        <!-- Login and Register Buttons -->
        <div class="mt-3">
          <a class="btn btn-outline-dark btn-sm me-2" @click="loginDoctor">Doctor Login</a>
          <a class="btn btn-outline-dark btn-sm me-2" @click="registerDoctor">Doctor Register</a>
          <a class="btn btn-outline-dark btn-sm me-2" @click="loginPatient">Patient Login</a>
          <a class="btn btn-outline-dark btn-sm" @click="registerPatient">Patient Register</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    loginDoctor() {
      if (this.$route.path != '/doctor/login') {
        this.$router.push('/doctor/login')
      }
    },
    registerDoctor() {
      if (this.$route.path != '/doctor/register') {
        this.$router.push('/doctor/register')
      }
    },
    loginPatient() {
      if (this.$route.path != '/login') {
        this.$router.push('/login')
      }
    },
    registerPatient() {
      if (this.$route.path != '/register') {
        this.$router.push('/register')
      }
    },
  },
}
</script>
