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

const deleteData = require('../test-data/delete.json');
let deleteMovie = `DELETE FROM ${table} WHERE id = ${deleteData.id};`;
console.log(deleteMovie)

module.exports.delete = (event, context, callback) => {
 Client.connect()
 .then(client => {
   console.log('connected to DB ' + Client.options.database);
   client.release();
   return client.query(deleteMovie);
 })
 .then(data=>{
   console.log(data)
 })
 const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
 callback(null, response);
}
