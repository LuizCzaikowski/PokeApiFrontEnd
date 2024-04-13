<template>
  <div class="pokemon-details">
    <!-- Imagem do Pokémon -->
    <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />

    <!-- Nome do Pokémon -->
    <h2>{{ pokemon.name }}</h2>

    <!-- Habilidade -->
    <div class="ability">
      <img :src="pokemon.abilityImage" :alt="pokemon.ability" class="ability-icon" />
      <span>{{ pokemon.ability }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Pokemon } from '~/types';

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      required: true
    }
  }
});
</script>

<style scoped>
.pokemon-details {
  text-align: center;
  margin: auto;
  padding: 20px;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.ability {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.ability-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
