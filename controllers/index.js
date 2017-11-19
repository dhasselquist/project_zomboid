var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Weapon = mongoose.model('Weapon');
var Recipe = mongoose.model('Recipe');
module.exports.controller = function(app){
	/*
	* Purpose: Return all weapons (vanilla/hydrocraft). All required fields to determine pros/cons are included.
	*/
	app.get('/getWeapons', function(req,res){
		Weapon.find(function(err, docs){
			res.json(docs);
		});
	});
	/*
	* Purpose: Once the user has chosen a given recipe, return all possible completions.
	* The data structure will require the functionality of displaying "sub-ingredients".
	* For example: Dig Mine - Wooden Ladder -> Beam -> Logs
	*/
	app.post('/getSubIngredient', function(req,res){
		var findResult = req.body.params.result.name;
		Recipe.find({Result:findResult},function(err, docs){
			for (var i = 0; i < docs.length; i++){
				var recipeNodes = [];
					for (var j = 0; j < docs[i].Ingredients.length; j ++){
						//To-do: Trim the trailing comma in the regex files.
						var objNode = {};
						objNode.name = docs[i].Ingredients[j];
						objNode.nodes = [];
						recipeNodes.push(objNode);
						/*var findRecipe = docs[i].Ingredients[j].substring(0,docs[i].Ingredients[j].toString().length-1);
						Recipe.find({recipe:findRecipe}, function(errs,sub){
							if (sub.length > 0) console.log(sub);
						});*/
					}
					res.send(JSON.stringify(recipeNodes));
			}
			
		});
		console.log(findResult);
	});
	app.post('/getIngredients', function(req,res){
		Recipe.find({recipe:req.body.params.recipe}, function(err, docs){
			//It's possible for a recipe to have multiple ways to complete it, we want to show them all to the user.
			var recipes = [];
			for (var i = 0; i < docs.length; i ++){
				//Work with each recipe
				var recipeObj = {};
				recipeObj.name = docs[i].recipe;
				recipeObj.nodes = [];
				/*
				* Purpose: Need to research more, but the common experience is not frequently having to drill down beyond the first level.
				* Let's start there, and if more information is required then perform that query at that time.
				*/
				for (var j = 0; j < docs[i].Ingredients.length; j ++){
					//To-do: Trim the trailing comma in the regex files.
					var objNode = {};
					objNode.name = docs[i].Ingredients[j];
					objNode.nodes = [];
					recipeObj.nodes.push(objNode);
					/*var findRecipe = docs[i].Ingredients[j].substring(0,docs[i].Ingredients[j].toString().length-1);
					Recipe.find({recipe:findRecipe}, function(errs,sub){
						if (sub.length > 0) console.log(sub);
					});*/
				}
				recipes.push(recipeObj);
			}
			res.send(JSON.stringify(recipes));
		});
	});
	/*
	* Purpose: Performs a distinct query of the recipes table, returning only the name column.
	* This is to reduce overall page-load - no other information is yet required.
	*/
	app.get('/getRecipes', function(req,res){
		Recipe.distinct('recipe', function(err, docs){
			if (err) console.log(err);
			res.json(docs);
		});
	});
}