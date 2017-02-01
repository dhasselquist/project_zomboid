var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Weapon = require('./weapon_model.js');
var Recipe = require('./recipe_model.js');
module.exports.controller = function(app){
	//Weapon Comparison logic
	app.get('/getWeapons', function(req,res){
		mongoose.connect('mongodb://localhost/projectZomboid');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('connection successful');
			Weapon.find(function(err, docs){
				res.json(docs);
				mongoose.connection.close();
			});
		});
	});
	app.post('/getIngredients', function(req,res){
		mongoose.connect('mongodb://localhost/projectZomboid');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'Connection error: '));
		db.once('open', function() {
			console.log('Getting Ingredients for:' + req.body.params.recipe);
			Recipe.find({recipe:req.body.params.recipe}, function(err, docs){
				if (err) console.log(err);
				res.json(docs);
				mongoose.connection.close();
			});
			//mongoose.connection.close();
		});
	});
	app.get('/getRecipes', function(req,res){
		mongoose.connect('mongodb://localhost/projectZomboid');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('Connection established: Get Recipes.');
			//Recipe.find({}, 'recipe', function(err, docs){
			Recipe.distinct('recipe', function(err, docs){
				mongoose.connection.close();
				res.json(docs);
			});
		});

	});

}
