<template>
  <v-app>
    <v-main>
      <!-- Header -->
      <div class="header">
        <img src="../assets/img/Frame.png" alt="Ícone Frame" class="header-icon" />
      </div>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.header-icon {
  height: 30px;
}
</style>
