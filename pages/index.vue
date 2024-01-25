<template>
  <div>
    <h1>Generation 1 Pokémon</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="pokemon-container-wrapper">
      <div class="pokemon-wrapper" v-if="filteredPokemon && filteredPokemon.length > 0">
        <PokemonCard v-for="pokemon in filteredPokemon"
                     :key="pokemon.name"
                     :pokemon="pokemon"
                     :details="pokemonDetails[pokemon.name]"/>
      </div>
      <div v-else-if="filteredPokemon.length === 0">No results found.</div>
      <div class="pokemon-wrapper" v-else>
        <PokemonCard v-for="pokemon in pokemonEntries.results"
                     :key="pokemon.name"
                     :pokemon="pokemon"
                     :details="pokemonDetails[pokemon.name]"/>
      </div>

      <div class="filters-wrapper">
        <div
            class="type-icon"
            :class="getTypeClass(type.name), {active: selectedType.includes(type.name)}"
            v-for="type in pokemonTypes.results"
            :key="type.name"
            @click="setSelectedType(type.name)"
        >
          {{ type.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonEntries: { results: [] },
      pokemonDetails: {},
      loading: true,
      error: null,
      pokemonTypes: [],
      selectedType: [],
    };
  },
  async created() {
    await this.fetchData();
    await this.getAllPokemonTypes();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=32');
        this.pokemonEntries = await response.json();
        await this.fetchPokemonDetails();
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    async fetchPokemonDetails() {
      for (const pokemon of this.pokemonEntries.results) {
        try {
          const response = await fetch(pokemon.url);
          this.pokemonDetails[pokemon.name] = await response.json();
        } catch (error) {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
        }
      }
    },
    async getAllPokemonTypes() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        this.pokemonTypes = await response.json();
      } catch (error) {
        this.error = 'Error fetching data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    setSelectedType(type) {
      this.selectedType = this.selectedType.includes(type)
          ? this.selectedType.filter((item) => item !== type)
          : [...this.selectedType, type];
    },
    getTypeClass(type) {
      return `type-${type}`;
    }
  },
  computed: {
    filteredPokemon() {
      if (this.selectedType.length === 0) {
        return this.pokemonEntries.results;
      } else {
        return this.pokemonEntries.results.filter((pokemon) => {
          const pokemonTypeNames = this.pokemonDetails[pokemon.name].types.map((type) => type.type.name);
          return this.selectedType.every((type) => pokemonTypeNames.includes(type));
        });
      }
    }
  },
};
</script>



<style scoped>

.filters-wrapper {
  display: grid;
  grid-template-columns: repeat(10,1fr);
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  height: fit-content;
}

.pokemon-container-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
}

.pokemon-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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
</style>
