var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var secret = 'This is the secret for signing tokens';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

var corsOptions = {
  origin: 'http://10.242.2.157:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'POST: This is CORS-enabled for only http://10.242.2.157:8080'})
})

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'GET: This is CORS-enabled for only http://10.242.2.157:8080.'})
// })



app.post('/login', cors(corsOptions), function(req, res) {
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    console.log('Wrong user or password');
    return;
  }
  console.log('successful login');
  // We are sending the profile inside the token
  var token = jwt.sign({ firstname: 'John', lastname: 'Doe'}, secret, { expiresIn: 5 * 60 });
  res.json({ token: token });
});

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.get('/api/profile', function (req, res) {
  console.log('user ' + req.user.firstname + ' is calling /api/profile');
  res.json({
    name: req.user.firstname
  });
});

app.listen(3000, function () {
  console.log('listening on http://localhost:3000');
});
