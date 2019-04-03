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

  app.get('/', function(req, res, results){
    res.send(JSON.stringify(results));
  });

  app.post('/orchids/add', function(req, res, next) {
	var post = {
		genus: req.body.genus,
		cultivar: req.body.cultivar,
		species: req.body.species,
		notes: req.body.notes
	  };
	connection.query('insert into orchids values ?', post, function (error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
	});
});
app.get('/orchids', function(req, res, next) {
	connection.query('select * from orchids', function (error, results, fields) {
			if(error) throw error;
			res.send(JSON.stringify(results));
	});
});

  app.listen(3001, () => {
      console.log('listening on port 3001')
  });
