angular.module('app')
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider
				.otherwise('/');
		}]);