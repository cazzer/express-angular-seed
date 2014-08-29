angular.module('app')
	.factory('samples', ['$http', function($http) {
		var samples = {},
			api = 'api/1/sample/';

		samples.get = function(id) {
			if (!id) id = '';
			return $http.get(api + id);
		};

		samples.post = function(sample) {
			return $http.post(api, sample);
		}

		return samples;
	}]);