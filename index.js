var http = require("http");
var path = require("path");
var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var app = express();
var server = http.createServer(app);

var db = new sqlite3.Database('./database/Bookings.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(helmet());


// Add
app.post('/add', function (req, res) {
  db.serialize(() => {

    var date = new Date(req.body.bookingTime);
    
    date.setHours(date.getHours() + 2);
    var unixTimestamp = Math.floor(date.getTime() / 1000);

    date.setHours(date.getHours() - 1);
    var unixTimestamp1HourBefore = Math.floor(date.getTime() / 1000);

    date.setHours(date.getHours() + 1);
    var unixTimestamp1HourAfter = Math.floor(date.getTime() / 1000);

    db.all("SELECT COUNT(*) as count FROM Appointments WHERE (Timestamp BETWEEN " + unixTimestamp1HourBefore + " AND " + unixTimestamp1HourAfter + ") AND Service = '" + req.body.service + "'",
      (err, rows) => {
        if (err) {
          console.log('ERROR!', err)
        }

        if (rows[0].count === 0) {
          db.run('INSERT INTO Appointments(FullName,Email,PhoneNumber,Service,BookingTime,Timestamp) VALUES(?,?,?,?,?,?)',
            [req.body.fullname, req.body.email, req.body.phone, req.body.service, req.body.bookingTime, unixTimestamp], function (err) {
              if (err) {
                return console.log(err.message);
              }
              res.status(200).send("Success");
            });
        }
        else {
          res.status(409).send("Error");
        }

      });

  });
});

server.listen(3000, function () {
  console.log("server is listening on port: 3000. Go to http://localhost:3000");
});

