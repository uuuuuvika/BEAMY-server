require("dotenv").config();
require("./db");
const { isAuthenticated } = require("./middleware/jwt.middleware");

const express = require("express");
const app = express();
require("./config")(app);


// ROUTES
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const decksRoutes = require("./routes/decks.routes");
app.use("/", decksRoutes);

const cardsRouter = require('./routes/cards.routes'); 
app.use('/', cardsRouter);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


require("./error-handling")(app);

module.exports = app;
