var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
	recipe: String,
	Ingredients: Array
}, {collection: 'recipes'});
module.exports = mongoose.model('Recipe', RecipeSchema);
