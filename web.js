//var bus = require('bus').create();
var ui = require('./models/ui').ui(null);
var express = require ('express');
express.static(__dirname + '/public')
var app = express.createServer();

app.set("view options", { layout: false }) 
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
	res.render('tengo.ejs');
})

app.get('/user/:id', function(req,res) {
	res.render('tengo.ejs');
});

app.post('/user', function(req,res) {

	var nick = req.body.nick;
	var mail = req.body.mail;
	var pwd = req.body.pwd;

	ui.register(nick, mail, pwd);

	res.send(); //204

});

app.delete('/user/:id', function(req,res){
	
	var id = req.params.id;

	ui.unregister(req.params.id);
	
	res.send();

});

app.post('/user/:id/owns', function(req,res) {

	var id = req.params.id;
	var good = req.body.good;
	
	ui.owns(id,good);
	
	res.send();

});

app.listen(3000);
