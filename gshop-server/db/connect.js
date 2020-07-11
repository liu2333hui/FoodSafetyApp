var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gshopserver', 
{useNewUrlParser : true,
useUnifiedTopology:true})


var db = mongoose.connection

db.on('error', console.error.bind(console, "connection error"))
db.once('open', function(){
	console.log('db ok')
})

module.exports = db