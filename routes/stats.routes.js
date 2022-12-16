const router = require("express").Router();
const mongoose = require("mongoose");
const Stats = require("../models/Stats.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Deck = require("../models/Deck.model.js");
const Card = require("../models/Card.model.js");


router.post('/:deckId', (req, res) => {

    const { deckId } = req.params;
    const { user, numCardsInDeck, numClicks } = req.body;

    Stats.create({ userId: user._id, deckId, numCardsInDeck, numClicks })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

router.get('/lastStudied', isAuthenticated, (req, res) => {

    const user = req.payload;

    Stats.find({ userId: user._id }).sort({ createdAt: -1 }).limit(1)
        .then((response) => {
            if (!response) {
                res.json([]);
            }
            else {
                //console.log("DECK", response[0].deckId)
                Card.find({ deckId: response[0].deckId })
                    .populate('deckId')
                    .then((cards) => {
                        console.log("DECK", cards)
                        res.json(cards)
                    })

            }
        })
        .catch(error => res.json(error));
});

router.get('/:deckId', isAuthenticated, (req, res) => {

    const { deckId } = req.params;
    const user = req.payload;

    Stats.find({ $and: [{ userId: user._id }, { deckId: deckId }] })
        .then((response) => {
            if (!response) {
                res.json([]);
            }
            else {
                const statArray = response.map((statObject) => ({
                    percentage: Math.round((1.0 - (Math.min(statObject.numClicks - statObject.numCardsInDeck, statObject.numCardsInDeck) / statObject.numCardsInDeck)) * 100) / 100
                }))
                res.json(statArray);
            }
        })
        .catch((err) => res.json(err));
});


module.exports = router;