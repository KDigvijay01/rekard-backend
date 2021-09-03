 const mysql = require('mysql')
 
 const dbConfig = {
   prod: {
     host: process.env.DB_HOST,
     database: process.env.DB_DATABASE,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     debug: false,
     ssl: false
   },
   local: {
     host: 'localhost',
     database: 'rekard_db',
     debug: false,
     user: 'root',
     password: 'Mysql@123',
     ssl: false
   }
 }
 
 let state = {
   pool: null,
   mode: null,
 }
 
 function getDbServerConfig() {
   let env = process.env.ENVIRONMENT;
   switch (env) {
     case "prod":
       return Object.assign({}, dbConfig['prod']);

    default:
       return Object.assign({}, dbConfig['local']);

   }
 }
 
 const connect = (mode, callback) => {
   let config = getDbServerConfig();
   state.pool = mysql.createPool(config);
   callback();
 }
 
 const getConnection = () => {
   return state.pool;
 }
 
 module.exports = {
   connect: connect,
   getConnection: getConnection
 }
 