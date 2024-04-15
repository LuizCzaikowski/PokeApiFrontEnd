<template>
  <v-app class="custom-background">
    <div class="pokemon-list">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Pesquise por nome ou código"
          class="search-input"
        />
        <v-icon v-show="searchTerm.length === 0" class="search-icon"
          >mdi-magnify</v-icon
        >
        <button
          v-if="showClearButton"
          @click="clearSearch"
          class="clear-button"
        >
          X
        </button>
      </div>
      <h1>Pokémons</h1>
      <div
        v-if="filteredPokemons.length === 0 && !isLoading"
        class="no-pokemon-message"
      >
        Não foram encontrados Pokémons.
      </div>
      <div v-else class="adjust-align">
        <div
          v-for="(pokemon, index) in filteredPokemons"
          :key="index"
          class="pokemon-card"
          @click="viewPokemonDetails(pokemon.id)"
        >
          <!-- Linha 1: Imagem -->
          <div class="row">
            <img
              :src="pokemon.image"
              :alt="pokemon.name"
              class="pokemon-image"
            />
          </div>
          <!-- Linha 2: Nome -->
          <div class="row">
            <span class="pokemon-name">{{ pokemon.name }}</span>
          </div>
          <!-- Linha 3: ID -->
          <div class="row">
            <span class="pokemon-id">Cód: {{ pokemon.id }}</span>
          </div>
          <!-- Linha 4: Habilidades -->
          <div class="row">
            <span class="pokemon-abilities">
              <img
                v-for="abilityImage in pokemon.abilitiesImages.slice(0, 1)"
                :key="abilityImage.ability"
                :src="abilityImage.image"
                :alt="abilityImage.ability"
                class="ability-icon"
              />
            </span>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="loading">Carregando mais Pokémons...</div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { fetchPokemons } from '~/services/pokemonService'
import { Pokemon } from '~/types'
import { getPokemonId } from '~/utils/pokemonutils'
import { abilityIconsMap } from '~/types'

export default defineComponent({
  setup() {
    const pokemons = ref<Pokemon[]>([])
    const isLoading = ref(false)
    const searchTerm = ref('')
    const showClearButton = ref(true)

    async function loadPokemons() {
      isLoading.value = true
      try {
        const data = await fetchPokemons('https://pokeapi.co/api/v2/pokemon/')
        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url)
          const detailsData = await detailsResponse.json()
          const abilities: string[] = detailsData.abilities.map(
            (ability: any) => ability.ability.name
          )

          const validAbilities = abilities.filter((ability) =>
            Object.prototype.hasOwnProperty.call(abilityIconsMap, ability)
          )

          const abilitiesImages = validAbilities.map((ability: string) => {
            return {
              ability,
              image: abilityIconsMap[ability],
            }
          })
          return {
            name: detailsData.name,
            url: pokemon.url,
            id: getPokemonId(pokemon.url),
            abilities: validAbilities,
            abilitiesImages,
            image: detailsData.sprites.front_default,
          }
        })
        pokemons.value = await Promise.all(pokemonDetailsPromises)
      } catch (error) {
        console.error('Failed to load pokémons:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(loadPokemons)

    const filteredPokemons = computed(() => {
      if (!searchTerm.value) return pokemons.value
      const term = searchTerm.value.toLowerCase()
      return pokemons.value.filter((pokemon) => {
        const name = pokemon.name.toLowerCase()
        const id = getPokemonId(pokemon.url)
        return name.includes(term) || id === term
      })
    })

    function clearSearch() {
      searchTerm.value = ''
    }

    function viewPokemonDetails(id: number) {
      window.location.assign(`/pokemon/${id}`);
    }

    return {
      pokemons,
      isLoading,
      searchTerm,
      filteredPokemons,
      clearSearch,
      showClearButton,
      viewPokemonDetails
    }
  },
})
</script>

<style scoped>
.custom-background {
  background-color: #f1f4f5;
}

.pokemon-list {
  text-align: center;
  background-color: #F1F4F5;
  margin: auto;
}

#app {
  max-width: 1200px;
  margin: auto;
}

.search-bar {
  position: relative;
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #E1E1E1;
  border-radius: 25px;
  background-color: #fff;
  height: 47px;
}

.search-input::placeholder {
  text-indent: 10%;
}

.clear-button {
  display: none;
}

.adjust-align {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1150px;
}

.pokemon-card {
  margin: 10px;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
  width: calc(50% - 20px);
  max-width: 180px;
  height: 230px;
  background-color: #fff;
  cursor: pointer;
}

.pokemon-image {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-direction: column;
}

.pokemon-name {
  font-weight: bold;
}

.pokemon-id {
  font-style: italic;
}

.pokemon-abilities {
  margin-top: 50px;
  font-size: 0.9em;
  font-style: italic;
}

.loading {
  text-align: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
  font-size: 24px;
}

h1 {
  display: none;
}

@media screen and (min-width: 768px) {
  .search-icon {
    display: none;
  }

  .pokemon-card {
    width: 193px;
  }

  h1 {
    display: flex;
    margin: 50px 0 50px 92px;
    font-size: 24px;
  }

  .clear-button {
    display: block;
    position: absolute;
    right: 45px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }

  .search-bar {
    width: 85%;
  }

  .search-input {
    width: calc(100% - 24px);
  }

  .search-input::placeholder {
    text-indent: 3%;
  }
}
</style>
