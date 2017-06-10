import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import morgan from 'morgan';
import validateRequest from './middlewares/validateRequest';
import routes from './routes';

let app  = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //specify allowed header , X-access-tocken and x-key is our specific headers , used by auth
  //by standards , when you add new header prefex it with 'X'
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if(req.method === 'OPTIONS')
    res.status(200).end();
  else
    next();
});

//add validateResquest middleware to check token only for /api/v1/*
app.all('/api/v1/*' , validateRequest);
app.use('/' , routes);
//Add 404 response

app.use((req, res , next)=>{
  let err =new Error("Not Found");
  err.status = 404;
  next(err);
});

http.createServer(app).listen(app.get('port'), ()=>{
  console.log('Server started at 3000');
})
