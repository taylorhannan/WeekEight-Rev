const express = require('express')
const app = express();
const http = require('http');
const server = http.Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const assert = require('assert');
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('started on port: ${port}');
});


// Use connect method to connect to the server
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10}, function(err, client) {
  console.log("Connected successfully to server");
  if (err) {return console.log(err)}
  const dbName = 'mydb';
  const db = client.db(dbName);
  require('./routes/add.js')(app, db);
  require('./routes/create.js')(app, db);
  require('./routes/read.js')(app, db);
  require('./routes/update.js')(app, db);
  require('./routes/delete.js')(app, db);
});
