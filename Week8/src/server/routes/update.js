module.exports = function(app, db){
  app.post('/api/update', (req, res) => {
    var ogproductname = req.body.ogproductname.toString();
    var newproductname = req.body.newproductname.toString();
    var newproductprice = req.body.newproductprice.toString();
    var newproducttype = req.body.newproducttype.toString();
    var newproductdesc = req.body.newproductdesc.toString();
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = {'productname': ogproductname };
      var newvalues = {
        $set:{
        'productname': newproductname,
        'productprice': newproductprice,
        'producttype': newproducttype,
        'productdesc': newproductdesc
      }};
      dbo.collection("products").updateOne(myquery, newvalues, function(err, obj) {
        if(!err){
          console.log("1 document updated");
          res.send({'productname':newproductname, 'success':true});
        }else{
          console.log(err);
          res.send({'success':false});
        }

        db.close();
      });
    });
  });
}
