/*
Modules
 */
var express = require('express'),
	bodyParser = require('body-parser'),
	api = require('./server/api'),
	apiHelp = require('./server/api-help');

/*
The App
 */
var app = module.exports = express();
/*
Set App variables
 */
app.set('port', process.env.PORT || 3000);
app.set('environment', process.env.NODE_ENV || 'development');
app.set('client', 'client/production')
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
Load the Api
 */
var base = '/api/'  + app.get('version') + '/';
for (var route in api) {
	for (var verb in api[route]) {
		app[verb](base + route, api[route][verb].request);
		app.get(base + route + '/describe', apiHelp.describe(api[route][verb]));
	}
}

/*
Load the Api helper
 */
apiHelp.document(api);
app.get(base + 'help', apiHelp.help);

/*
Start it up
 */
app.listen(app.get('port'), function() {
	console.log('Doin\' something fun over at :' + app.get('port'));
});