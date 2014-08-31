angular.module('app')
	.factory('samples', ['$http', function($http) {
		var samples = {},
			api = 'api/1/samples/';

		samples.get = function(id) {
			if (!id) id = '';
			return $http.get(api + id);
		};

		samples.post = function(sample) {
			return $http.post(api, sample);
		};

		samples.delete = function(id) {
			return $http.delete(api + id);
		};

		return samples;
	}]);