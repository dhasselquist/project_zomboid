var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeaponSchema = new Schema({
	DisplayName:String,
	MaxDamage: Number,
	MinDamage: Number,
	CriticalChance: Number,
	Weight: Number,
	ConditionMax: Number,
	ConditionLowerChanceOneIn: Number,
	MaxRange: Number,
	SwingTime: Number
}, {collection: 'weapons'});
mongoose.model('Weapon',WeaponSchema);
//module.exports = mongoose.model('Weapon',WeaponSchema);
