const express = require('express');
const app = express();
const mysql = require('mysql');
const request = require('request');
const bodyParser = require('body-parser');
const router = express.Router();

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

   //enable CORS
   app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
  });

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "orchids_db"
  });
  connection.connect();

  app.get('/orchid', function(req, res, results){
    res.send(JSON.stringify(results));
    // res.json([
    //   {id: 1, username:"somebody"},
    //   {id: 2, username:"somebody-else"}
    // ])
  });

  router.post('http://localhost:3001/orchid', function(req, res) {
    let genus = req.body.genus;
    let cultivar = req.body.cultivar;
    let species = req.body.species;
    let notes = req.body.notes;

    let query = connection.query(
      "INSERT INTO orchids SET ?",
      genus, cultivar, species, notes,
      function(err, response) {
        console.log(result)
        res.redirect('/');
      }
    );
  })
  


//   app.post('/orchids/add', function(req, res, next) {
// 	var post = {
// 		genus: req.body.genus,
// 		cultivar: req.body.cultivar,
// 		species: req.body.species,
// 		notes: req.body.notes
// 	  };
// 	connection.query('insert into orchids values ?', post, function (error, results, fields) {
// 			if(error) throw error;
// 			res.send(JSON.stringify(results));
// 	});
// });
// app.get('/orchids', function(req, res, next) {
// 	connection.query('select * from orchids', function (error, results, fields) {
// 			if(error) throw error;
// 			res.send(JSON.stringify(results));
// 	});
// });

  app.listen(3001, () => {
      console.log('listening on port 3001')
  });
