import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [
        {
            taskTitle: String,
            taskDescription: String,
            isCompleted: {
                type: Boolean,
                default: false
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updateAt: {
                type: Date,
                default: Date.now,
            }
        },
    ],
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const List = mongoose.model("Weeklist", schema)