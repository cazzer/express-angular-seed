exports.get = {
	request: function(req, res) {
		res.send('You got me!');
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
		res.send('This is my post.');
	},
	in: {
		key: 'value'
	},
	out: [
		'string',
		'...'
	]
};