import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    pokemon_v2_pokemontypes: {
        type: [String], // Assuming an array of strings for types
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    speciesId: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
});

export default model('Pokemon', schema);