<template>
  <v-app class="custom-background">
    <v-main>
      <div style="display: flex; justify-content: center">
        <div class="pokemon-details">
          <div class="card-pokemon-details">
            <img
              :src="pokemonImage"
              :alt="pokemon.name"
              class="pokemon-image"
            />
            <h1>{{ pokemon.name }}</h1>
            <!-- Habilidades -->
            <div class="ability-icons">
              <img
                v-if="pokemon.abilities.length > 0"
                :src="getAbilityIcon(pokemon.abilities[0].ability.name)"
                :alt="pokemon.abilities[0].ability.name"
                class="ability-icon"
              />
            </div>
          </div>
          <div class="ability-card">
            <h2>Habilidades</h2>
            <ul class="ability-list">
              <hr class="ability-divider" />
              <li
                v-for="(ability, index) in pokemon.abilities"
                :key="ability.ability.name"
              >
                {{ ability.ability.name }}
                <hr
                  v-if="index !== pokemon.abilities.length - 1"
                  class="ability-divider"
                />
              </li>
            </ul>
          </div>
          <button class="back-button" @click="goBack">Voltar</button>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { fetchPokemonDetails } from '~/services/pokemonService'
import { abilityIconsMap } from '~/types'

export default defineComponent({
  async asyncData({ params }) {
    const pokemon = await fetchPokemonDetails(params.id)
    return { pokemon }
  },
  computed: {
    pokemonImage(): string {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
    },
  },
  methods: {
    getAbilityIcon(abilityName: string): string {
      return abilityIconsMap[abilityName] || ''
    },
    goBack() {
      window.history.back()
    },
  },
})
</script>

<style scoped lang="scss">
.custom-background {
  background-color: #f1f4f5;
}

.card-pokemon-details,
.ability-card {
  background-color: #fff;
  border-radius: 8px;
}

.pokemon-details {
  text-align: center;
  margin-top: 35px;
  width: 100%;
}

.pokemon-image {
  width: 100px;
  height: 100px;
}

.ability-icons {
  margin-top: 30px;
  padding-bottom: 10px;
}

.ability-icon {
  width: 80px;
  height: 22px;
  margin-right: 5px;
}

.ability-card {
  margin-top: 20px;
}

.ability-card h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 15px;
}

.ability-divider {
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-top: 1px solid #f1f4f5;
  width: 95%;
}

.ability-list {
  list-style: none;
  padding-bottom: 15px;
  text-align: justify;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

@media screen and (min-width: 768px) {
  .pokemon-details {
    width: 541px;
    height: 220px;
  }
}
</style>
