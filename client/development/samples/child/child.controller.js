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