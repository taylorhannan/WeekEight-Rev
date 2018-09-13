module.exports = function(app, db){
  app.post('/api/create', (req, res) => {
    var productname = req.body.productname.toString();
    var productprice = req.body.productprice.toString();
    var producttype = req.body.productprice.toString();
    var productdesc = req.body.productprice.toString();

    const collection = db.collection('products');

    collection.insert({
      'productname':productname,
      'productprice':productprice,
      'producttype':producttype,
      'productdesc':productdesc
    },function( error, result) {
      if ( error ) {
        console.log ( error );
        res.send({'productname':productname,'success':false});
        return;
      }else{
        res.send({'productname':productname,'success':true});
      }
  });
});
}
