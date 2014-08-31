var utils = require('./routes/_utils');

module.exports  = function(app) {

	var base = '/api/1/';

	require('./routes/samples')(app);

	app.get('*', utils.notFound);
	app.put('*', utils.notFound);
	app.post('*', utils.notFound);
	app.delete('*', utils.notFound);

};