var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use (bodyParser.json());

app.set('port', (process.env.PORT || 5100));
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello From all of us at Empire Carpet.')
})

app.get('/random-user', function(req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user)
})

app.get('/random-company', function(req, resp) {
  var company = function() {
    return {
      "name" : faker.company.companyName(),
      "motto": faker.company.catchPhrase(),
      "long-name": faker.company.bs()
    }
  }
  var co = company()
  co.years_established = Math.floor((Math.random() * 100) + 1)
  resp.json(co);
})

 app.post('/login', authenticate, function(req, resp) {
    resp.send(req.body)
 })

// Middleware - is injected in the desired endpoint
function  authenticate(request, response, next) {
  console.log('request body', request.body )
  
  var user = { username: 'testuser@gmail.com', password: '1234'}
  var body = request.body;

  response.setHeader("Content-Type", "application/json");

  if (!body.username || !body.password) {
    response.status(400);
    response.send( { error: 'Must provide login details.'} )
  }

  if (body.username !== user.username || body.password !== user.password ) {
    response.status(401)
    response.send( { error: "User login incorrect" } )
  }
  next();
}

app.listen(app.get('port'), function() {
  console.log('Your app is now running at localhost' + app.get('port') +' HELLO!')
})
