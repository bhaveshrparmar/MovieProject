const { Schema, model } = require("mongoose");
const common = require("./common.model");

const movieSchema = new Schema(
    {
        title: {
            ...common
        },
        genre: {
            ...common
        },
        year: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        image: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("movie", movieSchema);
