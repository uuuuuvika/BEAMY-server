const { Schema, model } = require("mongoose");

const statsSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        deckId: {
            type: Schema.Types.ObjectId,
            ref: 'Deck'
        },
        numCardsInDeck: {
            type: Number
        },
        numClicks: {
            type: Number
        }
    },
    {
        timestamps: true
    }
    );

const Stats = model("Stats", statsSchema);
module.exports = Stats;