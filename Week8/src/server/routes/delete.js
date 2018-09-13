module.exports = function(app, db){
  app.post('/api/delete', (req, res) => {
    var deletedproduct = req.body.deletedproduct.toString();
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = { 'productname': deletedproduct };
      dbo.collection("products").deleteOne(myquery, function(err, obj) {
        if(!err){
          console.log("1 document deleted");
          res.send({'deletedproduct':deletedproduct, 'success':true});
        }else{
          res.send({'success':false});
        }

        db.close();
      });
    });
  });
}
