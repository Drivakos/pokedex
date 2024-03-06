<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <ul v-else>
      <li v-for="(pokemon, index) in data.pokemon_v2_pokemon" :key="index">
        <span>{{ pokemon.name }} <small> id : </small></span>
        <span>{{ pokemon.id }}</span>
        <span>{{ pokemon.weight }}</span>
        <pokemon-card
          :pokemon-id="index.id"
          :pokemon="pokemon.name"
          :details="pokemon"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

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
</script>
