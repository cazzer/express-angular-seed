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