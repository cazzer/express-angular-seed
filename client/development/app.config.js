angular.module('app')
	.config([
		'$urlRouterProvider',
		function($urlRouterProvider) {

			$urlRouterProvider
				.otherwise('/');
		}]);