var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router();

//you need this to be able to process information sent to a POST route
	var bodyParser = require('body-parser');

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: true }));

	// parse application/json
	app.use(bodyParser.json());

var path = require("path");

// Serve static content for the app from the "public" directory in the application directory.
// you need this line here so you don't have to create a route for every single file in the public folder (css, js, image, etc)
//index.html in the public folder will over ride the root route
app.use(express.static("public"));

// Initializes the connection variable to sync with a MySQL database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "orchids_db"
});
connection.connect();

// router.get("/", function(req, res){
// 	res.send("this is the server", data)
// });

// router.get("/orchids", function(req, res){
// 	res.send("this is the data")
// });




router.post('/orchids', function(req, res, next) {
    connection.query('INSERT INTO orchids (genus, cultivar, species, notes, img) VALUES (?, ?, ?, ?, ?)',
    [req.body.genus, req.body.cultivar, req.body.species, req.body.notes, req.body.pictures],
    function (error, results, fields) {
      if (error) {
        console.log(error)

      }
    }
    )}
  )
  
router.get('/orchids', function(req, res, next) {
	connection.query('SELECT * FROM orchids', function (error, results, fields) {
			if(error) throw error;
      res.send(JSON.stringify(results));
      console.log(results);
	});
});;



module.exports = router;