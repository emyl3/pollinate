const pg = require('pg');
const router = require('express').Router();

var config = {
  database: 'pollinate',
};

var pool = new pg.Pool(config);

router.get('/', function (req, res) {
  var userId = req.query.userId;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM user_progress WHERE user_id = $1',
        [userId],
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
          res.send(result.rows);
        });

    } finally {
      done();
    }
  });
});

router.put('/', function (req, res) {
  pool.connect(function (err, client, done) {
    console.log(req.body);
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('UPDATE user_progress SET max = $1, current = $2 WHERE user_id = $3;',
        [req.body.maxNum, req.body.current, req.body.userId],
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
          res.send(result.rows);
        });
    } finally {
      done();
    }
  });
});

router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the database', err);
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO user_progress (user_id, max, current) VALUES ($1, $2, $3) returning *;',
        [req.body.userId, req.body.maxNum, req.body.current],
        function (err, result) {
          if (err) {
            console.log('Error querying the database', err);
            res.sendStatus(500);
            return;
          }

          console.log('Got rows from the database: ', result.rows);
          res.send(result.rows);
        });
    } finally {
      done();
    }
  });
});

module.exports = router;
