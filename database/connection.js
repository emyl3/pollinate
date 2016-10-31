const pg = require('pg');

var config = {
  database: 'pollinate',
};

var pool = new pg.Pool(config);

module.exports = pool;
