 // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    mongoose.connect('mongodb://localhost/projectZomboid');
    mongoose.connection.on('error', function(err){
	    console.log(err);
    });
    mongoose.connection.on('disconnected', function(){
	    console.log('Connection terminated.');
    });
    require('./controllers/models/recipe_model.js');
    require('./controllers/models/weapon_model.js');
    app.set('view engine', 'ejs');
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/content', express.static(__dirname + '/content'));
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    var route = require('./controllers/index.js');
    route.controller(app);
    // listen (start app with node server.js) ======================================
    app.listen(8081);
    console.log("App listening on port 8081");
    app.get('/', function(req, res){
    	res.render('pages/index');
    });
    app.get('/weaponCompare', function(req, res){
	    res.render('pages/weaponCompare');
    });
    app.get('/graphicalRecipeGenerator', function(req, res){
	    res.render('pages/graphicalRecipeGenerator');
    });
    app.get('/itemChecklist', function(req, res){
	    res.render('pages/itemChecklist');
    });
