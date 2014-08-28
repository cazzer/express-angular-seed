var memo = {};

exports.document = function(api) {
	for (var route in api) {
		var verbs = '';
		for (var verb in api[route]) {
			if (verbs !== '') verbs += ' ';
			verbs += verb.toUpperCase();
		}
		memo[route] = {
			verbs: verbs
		};
	}
};

exports.describe = function(route) {
	return function(req, res) {
		var message =
			'Sample request body:\n' + JSON.stringify(route.in) +
			'\n\nSample response body:\n' + JSON.stringify(route.out);
		res.send(message);
	}
};

exports.help = function(req, res) {
	var message = 'route\t\tverbs\n==================\n';
	for (var route in memo) {
		message += route + '\t\t' + memo[route].verbs + '\n';
	}
	res.send(message);
};

