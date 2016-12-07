const pg = require('pg');

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

var connection = {
  database: {
    host: params.hostname,
    user: autho[0],
    password: auth[1],
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  },
};

module.exports = connection;

// const url = require('url');
//
// const params = url.parse(process.env.DATABASE_URL);
// const auth = params.auth.split(':');
//
// // DB setup for Knex.js
// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       user: auth[0],
//       password: auth[1],
//       host: params.hostname,
//       port: params.port,
//       database: params.pathname.split('/')[1],
//       ssl: true,
//     },
//   },
// };
