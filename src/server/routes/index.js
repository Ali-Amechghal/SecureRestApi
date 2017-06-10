import auth from './auth';
import products from './products';
import users  from './users';
import express from 'express';


  let router  = express.Router();
  router.post('/login', auth.login);
  //routes accessed with token
  router.get('/api/v1/products', products.getAll);
  router.get('/api/v1/product/:id', products.getOne);
  //routes accessed with token and key 
  router.get('/api/v1/admin/users', users.getAll);
module.exports=router;
