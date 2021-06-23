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
    "SELECT game.game_id, game.name, game.developers FROM game WHERE steamscore_percent is not null and steamscore_quantity > 460000 ORDER BY steamscore_percent DESC limit 10",
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

// Запрос на 10 свежих игр
const getGameByDate = (request, response) => {
  pool.query(
    "SELECT game.game_id, game.name, game.developers FROM game WHERE DATE(date) > (NOW()- interval '6 month') and game.coming_soon is false ORDER BY date DESC limit 10",
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

// Запрос на будущие релизы
const getGameComingSoon = (request, response) => {
  pool.query(
    "SELECT game.game_id, game.name, game.developers, game.date FROM game WHERE DATE(date) > (NOW()- interval '6 month') and game.coming_soon is true ORDER BY date ASC limit 10",
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

// Запрос на игру по id
const getGameById = (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT * FROM game WHERE game_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const getGenreByGameId = (request, response) => {
  const id = request.params.id;

  pool.query(
    "SELECT genre.name as genre_name FROM genre inner join game_genre on genre.genre_id = game_genre.genre_id WHERE game_genre.game_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};


const getGames = (request, response) => {
  pool.query(
    "SELECT game.game_id, game.name, game.developers FROM game where name is not null",
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

// const getGameById = (request, response) => {
//   const id = request.params.id;

//   pool.query(
//     "SELECT * FROM game WHERE game_id = $1",
//     [id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

module.exports = {
  getGameByScore,
  getGameByDate,
  getGameComingSoon,
  getGameById,
  getGenreByGameId,
  getGames,
};
