module.exports = {
	base: '/api/1/',
	notFound: function(req, res) {
		res.status(404).send('That thing you were looking for is not a thing.');
	},
	paramExists: function(req, param) {
		return !!req.params && req.params[param];
	},
	getAll: function(collection, res) {
		collection.find(function(err, items) {
			res.send(items);
		})
	}
};