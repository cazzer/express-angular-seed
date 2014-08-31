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