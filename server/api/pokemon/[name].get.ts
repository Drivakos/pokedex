import PokemonModel from '~/server/models/Pokemon.model';

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'name');

    try {
        const pokemon = await PokemonModel.findOne({ name });

        if (!pokemon) {
            return {
                statusCode: 404,
                body: `Pokémon with name ${name} not found`
            };
        }

        return {
            statusCode: 200,
            body: pokemon
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`
        };
    }
});