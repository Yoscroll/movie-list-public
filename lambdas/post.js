'use strict';
const querystring = require('querystring');
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

module.exports.post = (event, context, callback) => {
  const params = JSON.parse(event.body);
  let postMovie = "INSERT INTO "+table+" VALUES ("+params.id+", '"+params.title+"', '"+params.year+"', '"+params.genre+"');";
  Client.connect()
    .then(client => {
      console.log('connected to DB ' + Client.options.database);
      client.release();
      return client.query(postMovie);
  })
    .then(res=>{
   const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Credentials": true
    },
    body: {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    },
  };
    callback(null, response);
 })
}
