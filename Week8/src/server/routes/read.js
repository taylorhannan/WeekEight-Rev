module.exports = function(app, db){
  app.post('/api/read', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("products").find({}).toArray(function(err, result) {
        console.log(result);
        if ( err ) {
          console.log ( error );
          res.send({'success':false});
          return;
        }else{
          res.send({'result':result,'success':true});
        }
        db.close();
      });
    });
});
}
