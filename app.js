require("dotenv").config();
require("./db");

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

const statsRoutes = require('./routes/stats.routes');
app.use('/stats', statsRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


require("./error-handling")(app);

module.exports = app;
