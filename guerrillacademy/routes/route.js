'use strict';

const express       = require('express');
const apiRoutes     = express.Router();
const passport      = require('passport');
const controller    = require('../controller');
const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');
const docs          = require('../controller/docs/swagger.js');
const spec          = swaggerJsdoc(docs);
const jwtMiddleware = require('../middleware/jwtMiddleware');

//////////////////////////////////////////////////////////////////////////////
//
//                             PUBLIC ROUTES
//
//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/ping', controller.health.ping);
apiRoutes.get('/health', controller.health.health);

apiRoutes.post('/register', controller.user.register);
apiRoutes.post('/login', controller.user.login);
apiRoutes.post('/token/verify', controller.user.registerTokenVerify);
apiRoutes.get('/user/exists', controller.user.exists);
apiRoutes.post('/forgot/token/verify', controller.user.forgotTokenVerify);
apiRoutes.post('/forget', controller.user.forgetmail);

//////////////////////////////////////////////////////////////////////////////
// Google OAuth
//////////////////////////////////////////////////////////////////////////////
apiRoutes.get('/', (req, res, next) => {
    const { user } = req;
    res.render('home', { user });
});

apiRoutes.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

apiRoutes.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

apiRoutes.get('/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
});

// Data that is used to fill in descriptions & 
//apiRoutes.get('/data/static', controller.staticData.get);

//////////////////////////////////////////////////////////////////////////////
// Documentation
//////////////////////////////////////////////////////////////////////////////

apiRoutes.use('/docs', swaggerUi.serve);
apiRoutes.get('/docs', swaggerUi.setup(spec, { explorer: true }));


//////////////////////////////////////////////////////////////////////////////
//
//                             SECURE ROUTES
                      apiRoutes.use(jwtMiddleware);
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// User & Account
//////////////////////////////////////////////////////////////////////////////

apiRoutes.put('/user', controller.user.abilities.update);
apiRoutes.get('/user', controller.user.abilities.get);
apiRoutes.post('/password/change', controller.user.abilities.passwordChange);
apiRoutes.post('/password/reset', controller.user.abilities.passwordReset);

//////////////////////////////////////////////////////////////////////////////
// Courses
//////////////////////////////////////////////////////////////////////////////
apiRoutes.get('/courses', controller.tracks.courses.list);
apiRoutes.get('/courses/courses/metrics', controller.metrics.users.getCourse);
apiRoutes.post('/courses', controller.tracks.courses.create);
apiRoutes.put('/courses', controller.tracks.courses.update);
apiRoutes.delete('/courses', controller.tracks.courses.delete);

//////////////////////////////////////////////////////////////////////////////
// Lessons
//////////////////////////////////////////////////////////////////////////////
apiRoutes.get('/courses/lessons', controller.tracks.lessons.list);
apiRoutes.get('/courses/lessons/metrics', controller.metrics.users.getLesson);
apiRoutes.post('/courses/lessons', controller.tracks.lessons.create);
apiRoutes.put('/courses/lessons', controller.tracks.lessons.update);
apiRoutes.delete('/courses/lessons', controller.tracks.lessons.delete);

//////////////////////////////////////////////////////////////////////////////
// User Tracking by Role
//////////////////////////////////////////////////////////////////////////////
apiRoutes.post('/metrics/course', controller.metrics.users.updateCourse);
apiRoutes.post('/metrics/lesson', controller.metrics.users.updateLesson);

//////////////////////////////////////////////////////////////////////////////
// Support connect to Trello
//////////////////////////////////////////////////////////////////////////////
apiRoutes.post('/support', controller.support.create);

//////////////////////////////////////////////////////////////////////////////
// Stripe 
//////////////////////////////////////////////////////////////////////////////
// apiRoutes.get('/payment', controller.stripe.stripeId);
apiRoutes.post('/payment', controller.stripe.post);

module.exports = apiRoutes;