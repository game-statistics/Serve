const express = require("express");
const app = express();
const db = require("./queries");

// app.get("/", (req, res) => {
//   res.send("Test send");
// });

app.get('/', (req, res) => {
 res.send("Hello World");
});
app.get('/api/GameByScore', db.getGameByScore);


// Слушаем сервер
app.listen(3300);
