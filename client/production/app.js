angular.module('app', ['ui.router', 'ngAnimate', 'templates']);
angular.module('app')
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider
				.otherwise('/');
		}]);
angular.module('app')
	.config([
		'$stateProvider',
		function($stateProvider) {

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'home/home.tpl.html'
				});
		}]);
angular.module('app')
	.config([
		'$stateProvider',
		function($stateProvider) {

			$stateProvider
				.state('samples', {
					url: '/samples',
					templateUrl: 'samples/samples.tpl.html'
				});
		}]);
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
angular.module('app')
	.config([
		'$stateProvider', 
		function($stateProvider) {

			$stateProvider
				.state('samples.child', {
					url: '/child',
					views: {
						'': {
							templateUrl: 'samples/child/child.tpl.html',
							controller: 'child'
						}
					}
				});
		}]);

angular.module('app')
	.controller('child', [
		'$scope',
		'samples',
		function($scope, samples) {

			loadSamples();

			$scope.createSample = function() {
				samples.post({
					sample: $scope.newSample
				}).success(function(sample) {
					$scope.samples.push(sample);
					loadSamples(); //extra API call, but technically more verbose
					$scope.newSample = '';
				});
			};

			$scope.deleteSample = function(id) {
				samples.delete(id);
				loadSamples();
			};

			function loadSamples() {
				samples.get().success(function(samples) {
					$scope.samples = samples;
				});
			}
		}]);