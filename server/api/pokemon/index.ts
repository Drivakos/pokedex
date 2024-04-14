import PokemonModel from '~/server/models/Pokemon.model';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('Request body:', body);

        // Check if the body is an object
        if (typeof body !== 'object') {
            throw new Error('Request body is not an object');
        }

        // Extracting relevant fields from the parsed data
        const { name, weight, types, id, height, speciesId,  } = body;

        console.log('Extracted fields:', { name, weight, types, id });

        if (!name || !weight || !types || !id) {
            throw new Error('Missing required fields in request data');
        }

        // Assuming that types is an array of strings
        const pokemonTypes = types;

        // Creating a new instance of PokemonModel
        const newPokemon = new PokemonModel({
            name: name,
            weight: weight,
            pokemon_v2_pokemontypes: pokemonTypes,
            id: id,
            speciesId: id, // Assuming speciesId is the same as id
            height: 10 // Assuming a default height of 10 for all Pokémon
        });

        // Saving the new Pokemon to the database
        await newPokemon.save();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pokémon saved successfully!' }) // Stringify the response object
        };
    } catch (error) {
        console.error('Error saving Pokémon:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Error saving Pokémon' }) // Stringify the error object
        };
    }
});
