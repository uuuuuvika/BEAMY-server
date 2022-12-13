const router = require("express").Router();
const mongoose = require("mongoose");
const Stats = require("../models/Stats.model.js");


router.post('/:deckId', (req, res) => {

    const { deckId } = req.params;
    const { user, numCardsInDeck, numClicks } = req.body;

    Stats.create({ userId: user._id, deckId, numCardsInDeck, numClicks })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});


router.get('/:deckId', (req, res) => {

    const user = req.body;
    const { deckId } = req.params;

    Stats.find({ $and: [{ userId: user._id }, { deckId: deckId }] })
        .then((response) => {
            if (!response) {
                res.json([]);
            } else {
                const statArray = response.map((statObject) => ({
                    percentage: 1.0 - (Math.min(statObject.numClicks - statObject.numCardsInDeck, statObject.numCardsInDeck) / statObject.numCardsInDeck)
                }))
                res.json(statArray);
            }
        })
        .catch((err) => res.json(err));
});


module.exports = router;