<template>
  <div>
    <h1>Generation 1 Pokémon</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="pokemon-container-wrapper">
        <div class="pokemon-card-wrapper" v-for="pokemon in pokemonEntries.results" :key="pokemon.name">
          <a :href="`/pokemon/${pokemon.name}`">
            {{ pokemon.name }}
            <div v-if="pokemonDetails[pokemon.name]" class="pokemonCardWrapper">
              <nuxt-img :src="pokemonDetails[pokemon.name].sprites.front_default"
                        :alt="pokemonDetails[pokemon.name].name" width="100" height="100"/>
            </div>
          </a>
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
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        //limit=151
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=3');
        this.pokemonEntries = await response.json();
      //TODO: Refactor cause not optimal for large data sets
        for (const pokemon of this.pokemonEntries.results) {
          await this.fetchPokemonDetails(pokemon);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    async fetchPokemonDetails(pokemon) {
      const pokemonName = pokemon.name;

      if (this.pokemonDetails[pokemonName]) {
        console.log('Using cached details for', this.pokemonDetails[pokemonName]);
        return;
      }

      try {
        console.log('Fetching details for', pokemonName, pokemon.url);
        const response = await fetch(pokemon.url);
        const pokemonDetails = await response.json();
        this.pokemonDetails[pokemonName] = pokemonDetails;
        this.cachePokemonDetails(pokemonName, pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        this.error = 'Error fetching Pokémon details. Please try again.';
      }
    },
    cachePokemonDetails(name, details) {
      if (typeof localStorage !== 'undefined') {
        const cachedDetails = JSON.parse(localStorage.getItem('pokemonDetails')) || {};
        cachedDetails[name] = details;
        localStorage.setItem('pokemonDetails', JSON.stringify(cachedDetails));
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
