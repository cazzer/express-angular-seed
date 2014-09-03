/*
Modules
 */
var express = require('express'),
	bodyParser = require('body-parser');

/*
The App
 */
var app = module.exports = express();
/*
Set App variables
 */
app.set('port', process.env.PORT || 3000);
app.set('environment', process.env.NODE_ENV || 'development');
app.set('client', 'client/production');
app.set('version', 1);

/*
Set App configuration
 */
app.use(express.static(__dirname + '/' + app.get(('client'))));
app.use(bodyParser.json());

/*
Load the client side
 */
app.get('/', function(req, res) {
	res.send(app.get('client') + '/index.html');
});

/*
Load routes...anyone have a better way of doing this in Express?
 */
require('./server/routes')(app);

/*
Start it up
 */
app.listen(app.get('port'), function() {
	console.log('Doin\' something fun over at :' + app.get('port'));
});

/*
Makes this module public
 */
module.exports = app;