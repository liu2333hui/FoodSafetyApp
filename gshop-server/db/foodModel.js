const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var foodSchema = new Schema({
	name : {type:String, required: true},
	number: {type: String},
	loc: {type: String},
	date: {type: String},
	overdate: {type: String},
	homeLoc:{type: String},
	imageUrl: {type: String}
})

var Food = mongoose.model('food', foodSchema)

module.exports = Food