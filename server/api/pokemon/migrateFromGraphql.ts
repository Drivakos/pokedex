import PokemonModel from '~/server/models/Pokemon.model';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('Request body:', body);

        if (typeof body !== 'object') {
            throw new Error('Request body is not an object');
        }

        const { name, weight, types, id, height, speciesId,  } = body;

        console.log('Extracted fields:', { name, weight, types, id });

        if (!name || !weight || !types || !id) {
            throw new Error('Missing required fields in request data');
        }

        const pokemonTypes = types;

        const newPokemon = new PokemonModel({
            name: name,
            weight: weight,
            pokemon_v2_pokemontypes: pokemonTypes,
            id: id,
            speciesId: speciesId,
            height: height
        });

        await newPokemon.save();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pokémon saved successfully!' })
        };
    } catch (error) {
        console.error('Error saving Pokémon:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Error saving Pokémon' })
        };
    }
});
