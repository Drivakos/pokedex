import PokemonModel from '~/server/models/Pokemon.model';

export default defineEventHandler(async (event) => {
   const name = getRouterParam(event, 'name')
    const newPokemon = new PokemonModel({
        name: name
    })
    return {
        statusCode: 200,
        body: `Pokémon name is ${name}`
    }
})
