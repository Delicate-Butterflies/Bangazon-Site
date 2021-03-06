'use strict';

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
var session = require('express-session');
let bodyParser = require('body-parser');
const flash = require('express-flash');
const expressValidator = require('express-validator');

require('dotenv').config();
const port = process.env.PORT || 8080;

// using require('./models') to get the models may create more than one connection to the database. To avoid that, the models variable must be somehow singleton-esque. This can be achieved by attaching the models module to the application:
app.set('models', require('./models')); //pulls in models/index.js by default. Index exports all the models you define in the models folder. So cool.
// And when you need to require a class of the model in a controller, use this insise a middleware function rather than a direct import:
// const { Computer } = req.app.get('models');

app.set('view engine', 'pug');
app.locals.globalWow = 'Express is, like, MAGIC'; //If we end up needing some value to be available to every pug template, look into using something like this that can be accessed in the templates just like any variable we pass directly to the template.

//static assets
app.use('/public', express.static(__dirname + '/static'));

let routes = require('./routes/');

// Begin middleware stack
// Inject session persistence into middleware stack
app.use(
	session({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true
	})
); // session secret
app.use(
	methodOverride(function(req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			let method = req.body._method;
			return method;
		}
	})
);

//execute passport strategies file
require('./config/passport-strat.js');
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// This custom middleware adds the logged-in user's info to the locals variable,
// so we can access it in the Pug templates
app.use((req, res, next) => {
	res.locals.session = req.session;
	// console.log('res.locals.session', res.locals.session);
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// validation - must be after bodyParser as it uses bodyParser to access parameters
app.use(expressValidator());

// add middleware to get product type info for nav partial on every request
app.use(function(req, res, next) {
	const { ProductType } = req.app.get('models');
	ProductType.findAll()
		.then(prodTypes => {
			res.locals.prodTypes = prodTypes;
			next();
		})
		.catch(err => {
			next(err);
		});
});

// note that this needs to be after the above stuff
app.use(routes);

// Add a 404 error handler
// Add error handler to pipe all server errors to from the routing middleware

app.listen(port, () => {
	/* eslint-disable */
	console.log(`listening on port ${port}`);
	/* eslint-enable */
});
