const express = require("express");
const app = express();
const db = require("./queries");
const cors = require('cors');
const port = process.env.PORT || 3300

app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Test send");
// });

app.get('/', (req, res) => {
 res.send("Hello World");
});

app.get('/api/GameByScore', db.getGameByScore);


// Слушаем сервер
app.listen(port);
