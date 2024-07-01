<template>
  <div class="pokemon-card-wrapper">
    <div v-if="details" class="pokemon-id">
      #{{ pokemonId }}
    </div>
    <a :href="`/pokemon/${pokemon}`">
      <div v-if="pokemon" class="pokemon-card-wrapper-img">
        <nuxt-img
            v-if="getPokemonImage(pokemon)"
            :src="getPokemonImage(pokemon)"
            :alt="pokemon"
            width="150"
            height="150"
        />
      </div>
      <div class="card-particle" :class="getParticleClass(pokemon.name)"></div>
      <div class="card-title">
        {{ pokemon }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
    pokemonId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getPokemonImage(name) {
      return `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
    },
    getParticleClass() {
      const type = this.details.type[0];
      return `type-${type}`;
    },
  },
};
</script>

<style scoped>
.pokemon-card-wrapper {
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 250px;
  width: clamp(140px, 10vw, 200px);
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 2px 0, rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
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
    border-radius: 60%;
    filter: blur(60px);
    opacity: 0.7;
    z-index: 0;
    transition: ease all 0.5s;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: -25%;
      top: -25%;
      height: 90%;
      width: 90%;
      border-radius: 60%;
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


  .type-fairy {
    &:before {
      background-color: #e69fb0;
    }

    &:after {
      background-color: #e9e;
    }
  }

  .type-psychic {
    &:before {
      background-color: #9600f4;
    }

    &:after {
      background-color: #f59;
    }
  }

  .type-fighting {
    &:before {
      background-color: #ffb46b;
    }

    &:after {
      background-color: #b54;
    }
  }

  .type-ground {
    &:before {
      background-color: #d2820e;
    }

    &:after {
      background-color: #db5;
    }
  }

  .type-rock {
    &:before {
      background-color: #d2820e;
    }

    &:after {
      background-color: #b26d09;
    }
  }

  .type-electric {
    &:before {
      background-color: #ffd100;
    }

    &:after {
      background-color: #fc3;
    }
  }

  .type-normal {
    &:before {
      background-color: #f4eeb8;
    }

    &:after {
      background-color: #c9cc99;
    }
  }

  .type-grass {
    &:before {
      background-color: #67fc34;
    }

    &:after {
      background-color: #7c5;
    }
  }

  .type-dragon {
    &:before {
      background-color: #fa6c14;
    }

    &:after {
      background-color: #76e;
    }
  }

  .type-fire {
    &:before {
      background-color: #ff2e16;
    }

    &:after {
      background-color: #f42;
    }
  }

  .type-water {
    &:before {
      background-color: #08e3ff;
    }

    &:after {
      background-color: #39f;
    }
  }

  .type-poison {
    &:before {
      background-color: #d49cfb;
    }

    &:after {
      background-color: #7300c5;
    }
  }

  .type-ghost {
    &:before {
      background-color: #d49cfb;
    }

    &:after {
      background-color: #66b;
    }
  }

  .type-ice {
    &:before {
      background-color: #00ecf4;
    }

    &:after {
      background-color: #6cf;
    }
  }

  .type-bug {
    &:before {
      background-color: #77dc55;
    }

    &:after {
      background-color: #ab2;
    }
  }

  .type-steel {
    &:before {
      background-color: #a3a3a3;
    }

    &:after {
      background-color: #a3a3a3;
    }
  }

  .type-dark {
    &:before {
      background-color: #754;
    }

    &:after {
      background-color: #754;
    }
  }

  .type-flying {
    &:before {
      background-color: #89f;
    }

    &:after {
      background-color: #89f;
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
}

.pokemon-id {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 1rem;
  font-weight: 700;
}
</style>
