<script>
export default {
    methods: {
        addCat() {
            this.$router.push('/admin/add-cat');
        }
    }
}
</script>

<template>
    <div id="app">
        <router-view />
    </div>
</template>
<style scoped>
</style>
