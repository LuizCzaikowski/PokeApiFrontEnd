<template>
  <div class="pokemon-details">
    <h1>{{ pokemon.name }}</h1>
    <img :src="pokemonImage" alt="Imagem do Pokémon">
    <p><strong>Tipo:</strong> {{ pokemon.types.map(type => type.type.name).join(', ') }}</p>
    <p><strong>Habilidades:</strong> {{ pokemon.abilities.map(ability => ability.ability.name).join(', ') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { fetchPokemonDetails } from '~/services/pokemonService';

export default defineComponent({
  async asyncData({ params }) {
    const pokemon = await fetchPokemonDetails(params.id);
    return { pokemon };
  },
  computed: {
    pokemonImage(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`;
    }
  }
});
</script>

<style scoped lang="scss">
.pokemon-details {
  text-align: center;
}
</style>
