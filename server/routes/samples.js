var db = require('../db'),
	utils = require('./_utils'),
	samples = db.collection('samples');

module.exports = function(app) {
	app.get(utils.base + 'samples/:id?', function(req, res) {
		if (utils.paramExists(req, 'id')) {
			samples.findOne({
				_id: db.ObjectId(req.params.id)
			}, function(err, samples) {
				res.send(samples);
			});
		} else {
			utils.getAll(samples, res);
		}
	});

	app.put(utils.base + 'samples/:id?', function(req, res) {
		if (utils.paramExists(req, 'id')) {
			samples.update({
				_id: db.ObjectId(req.params.id)
			}, function(err, n) {
				res.send(err || n);
			});
		} else {
			res.status(400).send('Sample ID is required.');
		}
	});

	app.post(utils.base + 'samples', function(req, res) {
		samples.save(req.body, function(err, sample) {
			res.send(sample);
		});
	});

	app.delete(utils.base + 'samples/:id?', function(req, res) {
		if (utils.paramExists(req, 'id')) {
			samples.remove({
				_id: db.ObjectId(req.params.id)
			}, function(err, n) {
				res.send(err || n);
			});
		} else {
			res.status(400).send('Sample ID is required.');
		}
	});
};