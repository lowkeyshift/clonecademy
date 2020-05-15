'use strict';

// App Owner: Edwin Carrasquillo
// Email: ecarra7979@gmail.com

require('dotenv').config();

const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      morgan     = require('morgan'),
      mongoose   = require('mongoose'),
      cors       = require('cors'),
      http       = require('http').Server(app);

// Mongo

const port = process.env.PORT || 3000;
let mongoAuth;
if (process.env.DB_USER && process.env.DB_PASSWORD) {
  mongoAuth = process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@';
} else if (process.env.DB_USER && !process.env.DB_PASSWORD) {
  mongoAuth = process.env.DB_USER + '@';
} else {
  mongoAuth = '';
}

const mongoUrl = `mongodb://${ mongoAuth }${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_COLLECTION }`;

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('connected', (error) => {
  if (error) throw error;
  app.emit('ready');
});

if (process.env.APP_DEBUG) {
  mongoose.set('debug', true);
}


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.set('superSecret', process.env.USER_SECRET); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(cors({origin:"*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.set('useCreateIndex', true);

app.on('ready', function() {
  const passport = require('passport');
  const { Strategy } = require('passport-google-oauth20');
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOG_SESSION_SECRET } =  process.env;
  let route = require('./routes');

  // Cross Origin middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

  passport.use(new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/return'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }));

  passport.serializeUser((user, cb) => {
  cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
  cb(null, obj);
  });

  app.use(require('express-session')({ secret: GOOG_SESSION_SECRET, resave: true, saveUninitialized: true }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api', route.apiRoutes);

  http.listen(port, '0.0.0.0', () => {
    console.log('Listening at ' + process.env.URL + ':' + process.env.PORT);
  });
});

module.exports = app;
