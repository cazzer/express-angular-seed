var db = require('./db'),
	samples = db.collection('samples');

module.exports  = function(app) {

	var base = '/api/1/';

	app.get(base + 'samples/:id?', function(req, res) {
		if (!!req.params.id) {
			samples.findOne({
				_id: db.ObjectId(req.params.id)
			}, function(err, samples) {
				res.send(samples);
			});
		} else {
			getAll(res);
		}
	});

	app.put(base + 'samples/:id', function(req, res) {
		samples.update({
			_id: db.ObjectId(req.params.id)
		}, function(err, n) {
			res.send(err || n);
		});
	});

	app.post(base + 'samples', function(req, res) {
		samples.save(req.body, function(err, sample) {
			res.send(sample);
		});
	});

	app.delete(base + 'samples/:id', function(req, res) {
		samples.remove({
			_id: db.ObjectId(req.params.id)
		}, function(err, n) {
			res.send(err || n);
		});
	});

};

function getAll(res) {
	samples.find(function(err, samples) {
		res.send(samples);
	});
}