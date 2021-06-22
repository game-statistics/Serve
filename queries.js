const pg = require("pg");

// Подключаемся к БД
const pool = new pg.Pool({
  user: "dqrzguetfurceo",
  host: "ec2-54-78-36-245.eu-west-1.compute.amazonaws.com",
  database: "d9jdvmgcuuch2u",
  password: "93c0dc0905e279b4052ff735cfff9be83b4e5f176b3436bac8988d45fa93c391",
  port: "5432",
  ssl: true,
  ssl: { rejectUnauthorized: false },
});

// Запрос на 10 игр с лучшим рейтингом
const getGameByScore = (request, response) => {
  pool.query(
    "SELECT * FROM game ORDER BY steamscore_percent ASC limit 10",
    (error, results) => {
      console.log(results);
      console.log(error);
      if (error) {
        response.status(500).json({ success: false });
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getGameByScore,
};