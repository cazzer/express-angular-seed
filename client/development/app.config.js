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
				.state('samples', {
					url: '/samples',
					templateUrl: 'views/samples.tpl.html'
				})
				.state('samples.child', {
					url: '/child',
					views: {
						'': {
							templateUrl: 'views/samples.child.tpl.html',
							controller: 'child'
						}
					}
				});
		}]);