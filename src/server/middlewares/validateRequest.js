import jwt from 'jwt-simple';
import auth from '../routes/auth';
import secret from '../config/secret';

module.exports=(req, res , next)=>{
  console.log('vlidae req');
  let token= (req.body && req.body.access_token) ||
              (req.query  && req.query.access_token) ||
              req.headers['x-access-token'];
  let key = (req.body && req.body.x_key) || (req.query && req.query.x_key)
              || req.header['x-key'];
  //the token is present or the key (use name)
  if(token || key){
    console.log(token);
    let decodedToken = jwt.decode(token, secret());
    //expired token
    if(decodedToken.exp <= Date.now()){
      res.status(400);
      res.json({
        "status" : 400,
        "message" : "Token expired"
      });
      next();
    }else{

      //TODO:check if url contains 'admin' if so get user object using auth.validateUser(key) and check if user has admi role
      //if user doesnt get admin role return 403 :  not authorized
      next();
    }
  }else{
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });

    return;
  }
}
