/*
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var kittySchema = mongoose.Schema({
    name: String
})


var Kitten = mongoose.model('Kitten', kittySchema)
*/
var contractSchema = new Schema({
	type		: String,
	state		: String,
	contractor	: String,
	provider	: String,
	object		: String,
	debit		: { type: Number}
	credit		: { type: Number}

});