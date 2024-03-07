<template>
  <div>
    <div>
      <select v-model="selectedType">
        <option value="">All Types</option>
        <option v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
      </select>
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
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

const displayLimit = 64;
const displayedPokemon = ref([]);
const currentOffset = ref(0);
const selectedType = ref('');
const pokemonTypes = ref([]);

const query = gql`
  query MyQuery {
    pokemon_v2_pokemon(limit: 64) {
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

const { data, loading, error, execute } = useAsyncQuery(query, () => ({
  limit: displayLimit,
  offset: currentOffset.value,
  type: selectedType.value || null, // Pass null if no type is selected
}));

watchEffect(() => {
  if (data.value) {
    displayedPokemon.value = [...displayedPokemon.value, ...data.value.pokemon_v2_pokemon];
    currentOffset.value += displayLimit;
    if (selectedType.value === '') {
      pokemonTypes.value = data.value.pokemon_v2_pokemon.map(pokemon => pokemon.pokemon_v2_pokemontypes.map((type: { pokemon_v2_type: { name: any; }; }) => type.pokemon_v2_type.name)).flat().filter((type, index, self) => self.indexOf(type) === index);
    }
  }
});

function fetchData() {
  if (!loading.value && !error.value) {
    execute();
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    fetchData();
  }
}

const filteredPokemon = computed(() => {
  if (!selectedType.value) {
    return displayedPokemon.value;
  } else {
    return displayedPokemon.value.filter(pokemon => pokemon && pokemon.pokemon_v2_pokemontypes.some(
        (type: { pokemon_v2_type: { name: string; }; }) => type.pokemon_v2_type.name === selectedType.value)
    );
  }
});
</script>


<style scoped>
.pokemon-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  align-items: center;
  justify-items: center;
}

.pokemon-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>
