<template>
  <div v-if="pokemonDetails">
    <h1>{{ pokemonDetails.name }}</h1>
    <div>
      <p>Height: {{ pokemonDetails.height }}m</p>
      <p>Weight: {{ pokemonDetails.weight }}</p>
      <p>Base experience: {{ pokemonDetails.base_experience }}</p>
      <p>Abilities:</p>
      <ul>
        <li v-for="ability in pokemonDetails.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </li>
      </ul>
      <p>Forms:</p>
      <ul>
        <li v-for="form in pokemonDetails.forms" :key="form.name">
          {{ form.name }}
        </li>
      </ul>
      <p>Game indices:</p>
      <ul>
        <li v-for="gameIndex in pokemonDetails.game_indices" :key="gameIndex.version.name">
          {{ gameIndex.version.name }} - {{ gameIndex.game_index }}
        </li>
      </ul>
      <p>Held items:</p>
      <ul>
        <li v-for="heldItem in pokemonDetails.held_items" :key="heldItem.item.name">
          {{ heldItem.item.name }}
        </li>
      </ul>
      <p>Moves:</p>
      <ul>
        <li v-for="move in pokemonDetails.moves" :key="move.move.name">
          {{ move.move.name }}
        </li>
      </ul>
      <p>Species:</p>
      <ul>
        <li>{{ pokemonDetails.species.name }}</li>
      </ul>
      <p>Stats:</p>
      <ul>
        <li v-for="stat in pokemonDetails.stats" :key="stat.stat.name">
          {{ stat.stat.name }} - {{ stat.base_stat }}
        </li>
      </ul>
      <p>Types:</p>
      <ul>
        <li v-for="type in pokemonDetails.types" :key="type.type.name">
          {{ type.type.name }}
        </li>
      </ul>
      <p>Sprites:</p>
      <nuxt-img :src="pokemonDetails.sprites.front_default" :alt="pokemonDetails.name" width="100" height="100"/>
      <nuxt-img :src="pokemonDetails.sprites.back_default" :alt="pokemonDetails.name" width="100" height="100"/>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Ability {
  ability: {
    name: string;
  };
}

interface Form {
  name: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
  };
}

interface HeldItem {
  item: {
    name: string;
  };
}

interface Move {
  move: {
    name: string;
  };
}

interface Species {
  name: string;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Sprites {
  front_default: string;
  back_default: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  moves: Move[];
  species: Species;
  stats: Stat[];
  types: Type[];
  sprites: Sprites;
}

const pokemonDetails = ref<PokemonDetails | null>(null);
const loading = ref<boolean>(true);
const route = useRoute();

const fetchData = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`);
    pokemonDetails.value = await response.json();
  } catch (error) {
    console.warn('Error fetching Pokémon details:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>
