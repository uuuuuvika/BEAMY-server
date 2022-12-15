const express = require("express");
// https://www.npmjs.com/package/morgan
const logger = require("morgan");
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

module.exports = (app) => {

	app.set("trust proxy", 1);

	app.use(
		cors({
			origin: [FRONTEND_URL],
		})
	);

	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

};