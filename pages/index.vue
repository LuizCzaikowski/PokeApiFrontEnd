<template>
  <div class="container">
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from '~/components/PokemonList/PokemonList.vue';

export default {
  layout: 'pokemonLayout', // Defina um layout específico para esta página

  components: {
    PokemonList
  }
}
</script>
<style scoped>
.container {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #F1F4F5;
}
</style>
