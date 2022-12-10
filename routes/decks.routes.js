const router = require("express").Router();
const mongoose = require("mongoose");
//const { expressjwt: jwt } = require("express-jwt");
const jwt = require("jsonwebtoken");

const Deck = require("../models/Deck.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");


// create a new deck 
router.post('/decks', isAuthenticated, (req, res) => {

    const user = req.payload;
    console.log("HEY, HERE IS THE USER:", user)

    const { name, description, isPublic } = req.body;
    Deck.create({ name, description, createdBy: user._id, flashcards: [], isPublic })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});


//get all PUBLIC decks on the decks page
router.get("/decks", (req, res, next) => {
    Deck.find({isPublic: true})
        .populate("flashcards")
        .then((allDecks) => {
            console.log(allDecks);
            res.json(allDecks)
        })
        .catch((err) => res.json(err));
});


//get all USER decks on profile page
router.get("/decks/my", isAuthenticated, (req, res, next) => {

    const user = req.payload;
    console.log("HEY, HERE IS THE USER:", user)

    Deck.find({createdBy: user._id})
        .populate("flashcards")
        .then((allDecks) => {
            console.log(allDecks);
            res.json(allDecks)
        })
        .catch((err) => res.json(err));
});


// get one deck
router.get('/decks/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'You suck!' });
        return;
    }
    Deck.findById(id)
        .populate("flashcards")
        .then(deck => res.status(200).json(deck))
        .catch(error => res.json(error));
});


// update one deck
router.put('/decks/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Deck.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedDeck) => res.json(updatedDeck))
        .catch(error => res.json(error));
});


// delete one deck
router.delete('/decks/:id', (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Deck.findByIdAndRemove(id)
        .then(() => res.json({ message: `DECK with ${id} is removed successfully.` }))
        .catch(error => res.json(error));
});


module.exports = router;