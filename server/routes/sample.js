var db = require('../db'),
	samples = db.collection('samples');

exports.get = {
	request: function(req, res) {
		samples.find(function(err, samples) {
			res.send(samples);
		});
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