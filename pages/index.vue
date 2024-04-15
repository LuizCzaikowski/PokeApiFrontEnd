<template>
  <div class="container">
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from '~/pages/pokemon/PokemonList.vue';

export default {
  layout: 'pokemonLayout',

  components: {
    PokemonList
  }
}
</script>
<style scoped>
.container {
  max-width: 100%;
  margin: auto;
  background-color: #F1F4F5;
}
</style>
