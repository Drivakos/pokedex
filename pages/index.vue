<template>
  <div>
    <h1>Generation 1 Pokémon</h1>
    <div v-if="loading">Loading...</div>
    <div v-else class="pokemon-container-wrapper">
      <div class="pokemon-wrapper">
        <div class="pokemon-card-wrapper"
             v-for="pokemon in pokemonEntries.results"

             :key="pokemon.name"
             v-if="pokemonEntries">
          <a :href="`/pokemon/${pokemon.name}`">
            <div v-if="pokemon.name" class="pokemon-card-wrapper-img">

              <nuxt-img v-if="getPokemonImage(pokemon.name)"
                        :src="getPokemonImage(pokemon.name)"
                        :alt="pokemon.name" width="150" height="150"/>
              <nuxt-img v-else
                        :src="pokemon.name.sprites.front_default"
                        :alt="pokemon.name" width="150" height="150"/>
            </div>
            <div class="card-particle"></div>
            <div class="card-title">
              {{ pokemon.name }}
            </div>
          </a>
        </div>
      </div>
      <div class="filters-wrapper">
        <div class="type-icon"
             :class="getTypeClass(type.name)"
             v-for="type in this.pokemonTypes.results">
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
      pokemonEntries: {results: []},
      pokemonDetails: {},
      loading: true,
      error: null,
      pokemonTypes: []
    };
  },
  created() {
    this.fetchData();
    this.getAllPokemonTypes();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=4');
        this.pokemonEntries = await response.json();

      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    getPokemonImage(name) {
      return `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
    },
    async getAllPokemonTypes() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        this.pokemonTypes = await response.json();
        console.log('Fetched types', this.pokemonTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data. Please try again.';
      }
    },
    getTypeClass(type) {
      return `type-${type}`;
    }
  },
};
</script>

<style scoped>
body {
  background-image: linear-gradient(
      68.4deg,
      rgba(248, 182, 204, 0.8) 0.5%,
      rgba(192, 198, 230, 0.8) 49%,
      rgba(225, 246, 240, 0.8) 99.8%
  );
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

.pokemon-card-wrapper {
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 250px;
  width: 140px;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02),
  0 2px 4px rgba(0, 0, 0, 0.02),
  0 4px 8px rgba(0, 0, 0, 0.02),
  0 8px 16px rgba(0, 0, 0, 0.02),
  0 16px 32px rgba(0, 0, 0, 0.02),
  0 32px 64px rgba(0, 0, 0, 0.02);
  transition: ease all 0.3s;

  .card-title {
    text-transform: capitalize;
    mix-blend-mode: color-burn;
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    font-weight: 700;
  }

  a {
    position: relative;
    text-align: center;
    color: #000;
    width: 100%;
    text-decoration: none;

    &:hover {
      .pokemon-card-wrapper-img {
        filter: drop-shadow(2px 4px 6px black);
      }
    }
  }

  .pokemon-card-wrapper-img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 10px 10px rgb(0 0 0 / 10%));
    max-width: 100%;

    img {
      -webkit-user-drag: none;
    }
  }

  .card-particle {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: -25%;
      top: -25%;
      height: 90%;
      width: 90%;
      border-radius: 60%;
      filter: blur(60px);
      opacity: 0.2;
      z-index: 0;
      transition: ease all 0.5s;
    }

    &:after {
      bottom: -25%;
      left: -25%;
      top: auto;
      right: auto;
    }
  }

  &[data-type="fairy"] {
    .card-particle {
      &:before {
        background-color: #e69fb0;
      }

      &:after {
        background-color: #ff8cd0;
      }
    }
  }

  &[data-type="psychic"] {
    .card-particle {
      &:before {
        background-color: #9600f4;
      }

      &:after {
        background-color: #64f4c0;
      }
    }
  }

  &[data-type="fighting"] {
    .card-particle {
      &:before {
        background-color: #ffb46b;
      }

      &:after {
        background-color: #bd6f22;
      }
    }
  }

  &[data-type="ground"],
  &[data-type="rock"] {
    .card-particle {
      &:before {
        background-color: #d2820e;
      }

      &:after {
        background-color: #382203;
      }
    }
  }

  &[data-type="electric"] {
    .card-particle {
      &:before {
        background-color: #ffd100;
      }

      &:after {
        background-color: #b29200;
      }
    }
  }

  &[data-type="normal"] {
    .card-particle {
      &:before {
        background-color: #f4eeb8;
      }

      &:after {
        background-color: #c9cc99;
      }
    }
  }

  &[data-type="grass"] {
    .card-particle {
      &:before {
        background-color: #67fc34;
      }

      &:after {
        background-color: #20fca3;
      }
    }
  }

  &[data-type="dragon"] {
    .card-particle {
      &:before {
        background-color: #fa6c14;
      }

      &:after {
        background-color: #ffac13;
      }
    }
  }

  &[data-type="fire"] {
    .card-particle {
      &:before {
        background-color: #ff2e16;
      }

      &:after {
        background-color: #ff5c16;
      }
    }
  }

  &[data-type="water"] {
    .card-particle {
      &:before {
        background-color: #08e3ff;
      }

      &:after {
        background-color: #008aff;
      }
    }
  }

  &[data-type="poison"],
  &[data-type="ghost"] {
    .card-particle {
      &:before {
        background-color: #d49cfb;
      }

      &:after {
        background-color: #40a595;
      }
    }
  }

  &[data-type="ice"] {
    .card-particle {
      &:before {
        background-color: #00ecf4;
      }

      &:after {
        background-color: #0270f4;
      }
    }
  }

  &[data-type="bug"] {
    .card-particle {
      &:before {
        background-color: #77dc55;
      }

      &:after {
        background-color: #f5ee83;
      }
    }
  }

  &:hover {
    cursor: pointer;

    .card-particle {
      &:before,
      &:after {
        opacity: 0.4;
      }
    }

    .pokemon-card-wrapper-img {
      transform: scale(1.05);
    }
  }
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card-particle {
  animation: rotate360 7s linear both infinite;
  transform-origin: center;
  z-index: 0;
  position: relative;
}

.type-icon {
  display: inline-block;
  width: 66px;
  height: 66px;
  border-radius: 33px;

  margin-bottom: 4px;
  background: #dbdbdb;
  border: 1px solid #a3a3a3;
  border: 1px solid rgba(0, 0, 0, .2);
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
