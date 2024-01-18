<template>
  <div>
    <h1>Generation 1 Pokémon</h1>
    <ul>
      <li v-for="pokemon in pokemonEntries.results" :key="pokemon.name">
        {{ pokemon.name }}
        <button @click="fetchPokemonDetails(pokemon)">Fetch Details</button>
        <div v-if="pokemonDetails[pokemon.name]" class="pokemonCardWrapper">
          {{ pokemonDetails[pokemon.name].name }} - {{ pokemonDetails[pokemon.name].height }}
          <nuxt-img
            :src="pokemonDetails[pokemon.name].sprites.front_default"
            :alt="pokemonDetails[pokemon.name].name"
            width="100"
            height="100"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemonEntries: { results: [] },
      pokemonDetails: {},
      loading: true,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        this.pokemonEntries = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
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
.pokemonCardWrapper {

}
</style>