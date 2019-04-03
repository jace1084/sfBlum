const express = require('express');
const app = express();
const mysql = require('mysql');
const request = require('request');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "orchids_db"
  });
  connection.connect();

  app.get('/', function(req, res){
      res.send('this server is a success');
  })
