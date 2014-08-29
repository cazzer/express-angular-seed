angular.module('app')
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider
				.otherwise('/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'views/home.tpl.html'
				})
				.state('sample', {
					url: '/sample',
					templateUrl: 'views/sample.tpl.html'
				})
				.state('sample.child', {
					url: '/child',
					views: {
						'': {
							templateUrl: 'views/sample.child.tpl.html'
						}
					}
				})
		}]);