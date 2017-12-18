'use strict';

const Pool = require('pg-pool');
const config = require('./config.json');
const {table, host, database, user, password, port} = config;
const Client = new Pool({
 host,
 database,
 user,
 password,
 port,
 idleTimeoutMillis : 1000
});

let getAllMovies = "SELECT * FROM " + table + " ORDER BY id ASC";

module.exports.get = (event, context, callback) => {

 Client.connect()
 .then(client => {
   console.log('connected to DB ' + Client.options.database);
   client.release();
   return client.query(getAllMovies);
 })
 .then(data=>{
   console.log(data.rows)
   const response = {
   statusCode: 200,
   headers: {
          "Access-Control-Allow-Origin":  "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, HEAD"
         },
    body: JSON.stringify({
      message: data
    })
   };
   callback(null, response);
 })
}
