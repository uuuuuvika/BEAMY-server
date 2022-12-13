const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const saltRounds = 10;


// SIGNUP 
router.post("/signup", (req, res, next) => {

	const { email, password, name } = req.body;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{10,}/;

	if (email === "" || password === "" || name === "") {
		res.status(400).json({ message: "Provide email, password and name" });
		return;
	}
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "Provide a valid email address." });
		return;
	}
	if (!passwordRegex.test(password)) {
		res.status(400).json({
			message:
				"Password must have at least 10 characters and contain at least one lowercase and one uppercase letter.",
		});
		return;
	}

	User.findOne({ email })
		.then((foundUser) => {
			if (foundUser) {
				res.status(400).json({ message: "Hm, looks like user already exists." });
				return;
			}
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);
			return User.create({ email, password: hashedPassword, name });
		})
		.then((createdUser) => {
			// keep user without password !
			const { email, name, _id } = createdUser;
			const user = { email, name, _id };
			res.status(201).json({ user: user });
		})
		.catch((err) => next(err));
});


// LOGIN =======> returns JWT
router.post("/login", (req, res, next) => {

	const { email, password } = req.body;

	if (email === "" || password === "") {
		res.status(400).json({ message: "Provide email and password." });
		return;
	}

	User.findOne({ email })
		.then((foundUser) => {
			if (!foundUser) {
				res.status(401).json({ message: "Nope, user not found!" });
				return;
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
			if (passwordCorrect) {
				const { _id, email, name } = foundUser;
				const payload = { _id, email, name };
				// Create a JSON Web Token HERE
				const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: "6h",
				});
				res.status(200).json({ authToken: authToken });
			}
			else {
				res.status(401).json({ message: "Unable to authenticate the user" });
			}
		})
		.catch((err) => next(err));
});


router.get("/verify", isAuthenticated, (req, res, next) => {
	//console.log("req.payload", req.payload._id);                              
	res.status(200).json(req.payload);
});

module.exports = router;