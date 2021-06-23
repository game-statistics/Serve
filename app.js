const express = require("express");
const app = express();
const db = require("./queries");
const cors = require("cors");
const port = process.env.PORT || 3300;

var http = require("http");
setInterval(function () {
  http.get("http://game-statistic-sv.herokuapp.com");
}, 300000);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/GameByScore", db.getGameByScore);
app.get("/api/GameByDate", db.getGameByDate);
app.get("/api/GameComingSoon", db.getGameComingSoon);
app.get("/api/GameById/:id", db.getGameById);


// Слушаем сервер
app.listen(port);
