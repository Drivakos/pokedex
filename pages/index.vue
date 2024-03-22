<template>
  <div>
    <button class="filters-button" @click="toggleFilters">Filters</button>
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
      <div class="filters-wrapper" :class="{ active: sidebarOpen }">
        <div class="close-button" @click="closeFilters">X</div>
        <div class="types-wrapper">
          <div v-for="type in pokemonTypes"
               :key="type" @click="toggleFilter(type)"
               :class="[getTypeClass(type), { active: selectedTypes.includes(type) }]"
               class="type-icon">
            {{ type }}
          </div>
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
const sidebarOpen = ref(false);

const getTypeClass = (type: any) => {
  return `type-${type}`;
};

const query = gql`
  query MyQuery {
    pokemon_v2_pokemon(limit:256) {
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
        .flatMap((pokemon: { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: any; }; }[]; }) => pokemon.pokemon_v2_pokemontypes.map((type: { pokemon_v2_type: { name: any; }; }) => type.pokemon_v2_type.name))
        .filter((type: any, index: any, self: string | any[]) => self.indexOf(type) === index);
  }
});

const filteredPokemon = computed(() => {
  let filtered = displayedPokemon.value;
  if (selectedTypes.value.length > 0) {
    filtered = filtered.filter(pokemon =>
        selectedTypes.value.every(selectedType =>
            pokemon.pokemon_v2_pokemontypes.some((typeObject: { pokemon_v2_type: { name: any; }; }) =>
                typeObject.pokemon_v2_type.name === selectedType
            )
        )
    );
  }
  return filtered;
});

function toggleFilter(type) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(selectedType => selectedType !== type);
  } else {
    selectedTypes.value.push(type);
  }
}

function closeFilters() {
  sidebarOpen.value = false;
}

function toggleFilters() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style scoped>
.pokemon-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: center;
  justify-items: center;
  width: 100%;
  padding-top: 1rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pokemon-wrapper {
  display: grid;
  width: 100%;
  grid-template-columns: 50% 50%;
  gap: 1rem;

  @media screen and (max-width:1200px) {
    grid-template-columns: 100%;
    justify-content: center;
  }
}

.type-icon {
  -webkit-user-drag: none;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 66px;
  height: 66px;
  border-radius: 33px;

  margin-bottom: 4px;
  background: #dbdbdb;
  border: 1px solid #00000033;
  color: #fff;
  font-size: .75rem;
  font-weight: normal;
  line-height: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(30, 30, 30, 0.7);
  text-transform: uppercase;
  transition: opacity .4s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: .8;
  }
}

.type-icon.active {
  box-shadow: rgb(16 16 16) 0 0 0 3px;
}

.type-fairy {
  background-color: #e9e;
}

.type-psychic {
  background-color: #f59;
}

.type-fighting {
  background-color: #b54;;
}

.type-ground {
  background-color: #db5;
}

.type-rock {
  background-color: #b26d09;
}

.type-electric {
  background-color: #fc3;
}

.type-normal {
  background-color: #c9cc99;
}

.type-grass {
  background-color: #7c5;
}

.type-dragon {
  background-color: #76e;
}

.type-fire {
  background-color: #f42;
}

.type-water {
  background-color: #39f;
}

.type-poison {
  background-color: #7300c5;
}

.type-ghost {
  background-color: #66b;
}

.type-ice {
  background-color: #6cf;;
}

.type-bug {
  background-color: #ab2;
}

.type-steel {
  background-color: #a3a3a3;
}

.type-dark {
  background-color: #754;
}

.type-flying {
  background-color: #89f;
}

.types-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  height: fit-content;
  padding: 25px 0 25px 0;
}

.filters-wrapper {
  position: fixed;
  top:0;
  left: -100%;
  height: 100vh;
  transition: left .4s;
  background: #ff5858;
  max-width: clamp(150px, 30vw, 300px);
  z-index: 2;
  padding: 30px 15px 15px 15px;
  overflow-y: auto;
}

.filters-wrapper.active {
  left: 0;
  transition: left .4s;
}
.filters-button {
  position: fixed;
  top: 0;
  right: 0;
  background: #ff5858;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  z-index: 3;
}

.close-button {
  position: absolute;
  right: 5px;
  top: 5px;
  border: 1px solid black;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: floralwhite;
  cursor: pointer;
}
</style>
