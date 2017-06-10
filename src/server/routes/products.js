let products = {
  getAll: (req, res, next)=>{
    let allProducts = data;
    res.json(allProducts);
  },
  getOne:(req, res, next)=>{
    let id  = req.params.id;
    //TODO:use plok functional
    let product = data.filter((product)=>{
      return product.id==id;
    });
     res.json(product);

  },
  delete:(req, res, next)=>{
    let id = req.params.id;
    //TODO:delete from array by id
  }
}

var data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];

module.exports = products;
