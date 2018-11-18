const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const timeout = require('connect-timeout');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

let haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

//Express static uses whatever domain name/public
// app.use(express.static(__dirname + '/public'));
app.use('/static', express.static('public')); //Handlebars likes this one better
// Timeout
app.use(timeout(15000));
app.use(haltOnTimedout);

//Sets up morgan for logging
// create a write stream (in append mode)
accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});

// setup the logger (writes to the file)
app.use(morgan('combined', { stream: accessLogStream }));

//This sets up body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(haltOnTimedout);

//This is setting up method-override
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(haltOnTimedout);

//sets up express-handlebars
let exphbs = require('express-handlebars');
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

//Setting up the routes
let routes = require('./controllers/burger_controller.js');

app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);
app.use(haltOnTimedout);

//sets up the port as a variable and listens to it
let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port %s', port));
