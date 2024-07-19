import { Schema, model } from 'mongoose';

const schema = new Schema({
    googleId: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    name: String,
    profilePicture: String,
    updatedAt: { type: Date, default: Date.now },
    lastLoggedInAt: Date
});

export default model('User', schema);