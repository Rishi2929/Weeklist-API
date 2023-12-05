import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    }
})

export const User = mongoose.model("User", schema)
