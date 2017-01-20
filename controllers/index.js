var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Weapon = require('./weapon_model.js');
module.exports.controller = function(app){
    //Weapon Comparison logic
    app.get('/getWeapons', function(req,res){
	mongoose.connect('mongodb://localhost/projectZomboid');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('connection successful');
	    Weapon.find(function(err, docs){
			mongoose.connection.close();
			res.json(docs);
	    });
        });
    });
}
