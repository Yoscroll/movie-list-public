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
 })
 const response = {
   statusCode: 200,
   body:"YAY",
   };
 callback(null, response);
}
