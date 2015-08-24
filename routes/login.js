var express = require('express');
var router = express.Router();

var _loggedinSessionID = undefined;

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/doLogin', function(req, res, next) {
  if(req.body.username == "sean" && req.body.password == "1234") {
    _loggedinSessionID = req.sessionID;
    req.session.sessionID = _loggedinSessionID;
    console.log(req.session);

    console.log(req.session.cookie.expires);

    res.send({result: "OK"});
  }
  else {
    res.send({result: "err", err: {msg: "Wrong login information"} });
  }
});

isLoggedIn = function(req) {
  console.log(_loggedinSessionID);
  console.log(req.session.sessionID);

  if(req.session.sessionID != undefined && req.session.sessionID == _loggedinSessionID) {
    console.log("this client is logged in!");
    return true;
  }
  return false;
};


module.exports = router;
module.exports.isLoggedIn = isLoggedIn;

