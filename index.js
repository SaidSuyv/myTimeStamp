// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/',(req,res)=>{
  var dateObj = new Date();
  res.json({unix:dateObj.getTime(),utc:dateObj.toUTCString()});
});

app.get('/api/:date',(req,res)=>{
  var {date} = req.params;
  var dateObj = new Date(date);
  if(!isNaN(dateObj.getTime())) res.json({unix:dateObj.getTime(),utc:dateObj.toUTCString()});
  else if(/\s/.test(date))
  {
    dateObj = new Date();
    res.json({unix:dateObj.getTime(),utc:dateObj.toUTCString()});
  }
  else if(/^[0-9]*$/.test(date))
  {
    dateObj = new Date(parseInt(date));
    res.json({unix:dateObj.getTime(),utc:dateObj.toUTCString()});
  }
  else res.json({error:'Invalid date'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT|3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
