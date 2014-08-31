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