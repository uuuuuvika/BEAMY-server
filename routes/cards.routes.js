const router = require("express").Router();
const mongoose = require("mongoose");
const Card = require("../models/Card.model");
const Deck = require("../models/Deck.model");


//  create a new card for a specific deck
router.post('/decks/:deckId/card', (req, res, next) => {

    const {deckId} = req.params;
    const { question, answer } = req.body;

    Card.create({ question, answer, deckId: deckId })
        .then(createdCard => {
            return Deck.findByIdAndUpdate(deckId, { $push: { flashcards: createdCard._id } });
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});


//get all cards from specific deck
router.get('/decks/:deckId/card', (req, res, next) => {

    const {deckId} = req.params;

    Card.find({deckId: deckId})
        .populate('deckId')
        .then((cards) => {
            console.log(cards);
            res.json(cards)
        })
        .catch((err) => res.json(err));
});


// get one
router.get('/card/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'You suck!' });
        return;
    }
    Card.findById(id)
        .populate("deckId")
        .then(cards => res.status(200).json(cards))
        .catch(error => res.json(error));
});

 
// update one
router.put('/card/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Card.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedCard) => res.json(updatedCard))
        .catch(error => res.json(error));
});


// delete one
router.delete('/card/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Card.findByIdAndRemove(id)
        .then(() => res.json({ message: `CARD with ${id} is removed successfully.` }))
        .catch(error => res.json(error));
});

module.exports = router;