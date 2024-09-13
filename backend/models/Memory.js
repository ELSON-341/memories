const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    none: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const memory = new Schema({
    title: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true
    },
    description: {
        type: string,
        required:true
    },
    favorite: {
        type: Boolean,
    },
    comments: [commentSchema]
},
{timestamps: true}
)