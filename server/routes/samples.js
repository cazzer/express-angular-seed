var db = require('../db'),
	samples = db.collection('samples');

exports.get = {
	route: '/:id?',
	request: function(req, res) {
		if (!!req.params.id) {
			samples.findOne({
				_id: db.ObjectId(req.params.id)
			}, function(err, samples) {
				res.send(samples);
			});
		} else {
			getAll(res);
		}

	},
	in: {
		key: 'value'
	},
	out: [
		'string',
		'...'
	]
};

exports.post = {
	request: function(req, res) {
		if (!req.body.sample) res.send("Well that's a bad request.");
		samples.save(req.body, function(err, sample) {
			res.send(sample);
		});
	},
	in: {
		sample: 'value [string]'
	},
	out: 'sample ID'
};

exports.delete = {
	route: '/:id',
	request: function(req, res) {
		samples.remove({
			_id: db.ObjectId(req.params.id)
		}, function(err, n) {
			res.send(err || n);
		});
	},
	in: {
		sample: 'value [string]'
	},
	out: 'sample ID'
};

function getAll(res) {
	samples.find(function(err, samples) {
		res.send(samples);
	});
}