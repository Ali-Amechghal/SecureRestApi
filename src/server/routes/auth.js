import jwt from 'jwt-simple';
import secret from '../config/secret'
let auth = {
  login :(req, res , next)=>{
    // let {username,password} = req.body;
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;

    console.log(username, password);
    if(!username || !password){
      res.status(401);
      res.json({
        'status' : 401,
        'message':'invalid credentials'
      });
      return;
    }
    if(!auth.validate(username, password)){
      res.status(401);
      res.json({
        'status' : 401,
        'message':'invalid credentials'
      });
      return;
    }else{
      //valid login and password
      let token = getToken(username, password);
      console.log('token : ', token);
      res.json(token);
    }

  },
  validate:(username, password)=>{
    //TODO:check in DB
    return (username === 'ali_' && password==='ali');
  },
  validateUser:(username)=>{
    //TODO:check in DB
    return {
      name:'ali',
      role:'admin',
      usename:'ali_'
    };
  }
}

//private methods
function getToken(username, password){
  let expire = expiresIn(7);
  let token = jwt.encode({
    exp: expire
  },secret());
  return {
      token: token,
      expires: expire,
      user: {username:username, password:password}
    };

}

function expiresIn(numDays){
  let dateObj =  new Date();
  // return dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj.setSeconds(dateObj.getSeconds() + 120);
}

module.exports=auth;
