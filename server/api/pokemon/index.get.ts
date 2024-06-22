import PokemonModel from '~/server/models/Pokemon.model';

export default defineEventHandler(async () => {
    try {
        const allPokemon = await PokemonModel.find();

        const formattedPokemon = allPokemon.map(pokemon => ({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.pokemon_v2_pokemontypes,
            weight: pokemon.weight,
            height: pokemon.height,
            speciesId: pokemon.speciesId
        }));

        return {
            statusCode: 200,
            body: formattedPokemon
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`
        };
    }
});
