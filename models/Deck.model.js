const { Schema, model } = require("mongoose");

const deckSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        adoptedBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        flashcards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }],
        isPublic: {
            type: Boolean,
            default: true
        }
    });

const Deck = model("Deck", deckSchema);
module.exports = Deck;