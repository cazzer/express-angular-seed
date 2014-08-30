var db = require('./db'),
	samples = db.collection('samples');

module.exports  = function(app) {

	var base = '/api/1/';

	app.get(base + 'samples/:id?', function(req, res) {
		if (paramExists(req, 'id')) {
			samples.findOne({
				_id: db.ObjectId(req.params.id)
			}, function(err, samples) {
				res.send(samples);
			});
		} else {
			getAll(res);
		}
	});

	app.put(base + 'samples/:id?', function(req, res) {
		if (paramExists(req, 'id')) {
			samples.update({
				_id: db.ObjectId(req.params.id)
			}, function(err, n) {
				res.send(err || n);
			});
		} else {
			res.status(400).send('Sample ID is required.');
		}
	});

	app.post(base + 'samples', function(req, res) {
		samples.save(req.body, function(err, sample) {
			res.send(sample);
		});
	});

	app.delete(base + 'samples/:id?', function(req, res) {
		if (paramExists(req, 'id')) {
			samples.remove({
				_id: db.ObjectId(req.params.id)
			}, function(err, n) {
				res.send(err || n);
			});
		} else {
			res.status(400).send('Sample ID is required.');
		}
	});

	app.get('*', notFound);
	app.put('*', notFound);
	app.post('*', notFound);
	app.delete('*', notFound);

};

function getAll(res) {
	samples.find(function(err, samples) {
		res.send(samples);
	});
}

function paramExists(req, param) {
	return !!req.params && req.params[param];
}

function notFound(req, res) {
	res.status(404).send('That thing you were looking for is not a thing.');
}