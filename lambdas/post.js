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

const postData = require('../test-data/post.json');
let postMovie = "INSERT INTO "+table+" VALUES ("+postData.id+", '"+postData.title+"', '"+postData.year+"', '"+postData.genre+"');";
console.log(postMovie)

module.exports.post = (event, context, callback) => {
 Client.connect()
 .then(client => {
   console.log('connected to DB ' + Client.options.database);
   client.release();
   return client.query(postMovie);
 })
 .then(data=>{
   console.log(data)
 })
 const response = {
    statusCode: 200,
    body: {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    },
  };
 callback(null, response);
}
