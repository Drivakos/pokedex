<template>
  <div>
    <div>
      <button v-for="type in pokemonTypes" :key="type" @click="toggleFilter(type)" :class="{ active: selectedTypes.includes(type) }">{{ type }}</button>
    </div>
    <div class="pokemon-wrapper">
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">Error: {{ error.message }}</p>
      <div v-else class="pokemon-cards-wrapper" ref="pokemonWrapper">
        <div v-for="(pokemon, index) in filteredPokemon" :key="index">
          <pokemon-card
              :pokemon-id="pokemon.id"
              :pokemon="pokemon.name"
              :details="pokemon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const displayedPokemon = ref([]);
const selectedTypes = ref([]);
const pokemonTypes = ref([]);

const query = gql`
  query MyQuery {
    pokemon_v2_pokemon {
      name
      id
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

const { data, loading, error } = useAsyncQuery(query);

onMounted(() => {
  if (data.value) {
    displayedPokemon.value = data.value.pokemon_v2_pokemon;
    pokemonTypes.value = data.value.pokemon_v2_pokemon
        .flatMap(pokemon => pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type.name))
        .filter((type, index, self) => self.indexOf(type) === index);
  }
});

const filteredPokemon = computed(() => {
  if (selectedTypes.value.length === 0) {
    return displayedPokemon.value;
  } else {
    return displayedPokemon.value.filter(pokemon =>
        selectedTypes.value.every(selectedType =>
            pokemon.pokemon_v2_pokemontypes.some(typeObject =>
                typeObject.pokemon_v2_type.name === selectedType
            )
        )
    );
  }
});

function toggleFilter(type) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(selectedType => selectedType !== type);
  } else {
    selectedTypes.value.push(type);
  }
}
</script>

<style scoped>
.pokemon-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  align-items: center;
  justify-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pokemon-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
}

button {
  margin-right: 10px;
}

button.active {
  background-color: #007bff;
  color: white;
}
</style>
