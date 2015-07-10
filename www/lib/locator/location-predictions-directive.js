app
	.directive('locationPredictions', [
		function() {
			return {
				restrict: 'E',
				scope: {
					results: '=',
					value: '='
				},
				template: '<input type="text" class="text-input text-input--transparent" ng-model="value" style="width: 80%; margin: 0;" placeholder="{{\'CREATE_ACTIVITY_LOCATION\' | translate}}">',
				link: function(scope, iElement, iAttrs) {
					// Setup Google Auto-complete Service
					var googleMapsService = new google.maps.places.AutocompleteService();
					var el = angular.element(iElement.find('input'));

					// Fetch predictions based on query
					var fetch = function(query) {
						googleMapsService.getPlacePredictions({
							input: query
						}, fetchCallback);
					};

					// Display predictions to the user
					var fetchCallback = function(predictions, status) {
						if (status !== google.maps.places.PlacesServiceStatus.OK) {
							scope.$apply(function() {
								scope.results = [];
							});
						} else {
							scope.$apply(function() {
								scope.results = predictions;
							})
						}
					};


					// Refresh on every edit
					el.on('input', function() {
						var query = el.val();
						if (query && query.length >= 2) {
							fetch(query);
						} else {
							scope.$apply(function() {
								scope.results = [];
							});
						}
					});

				}
			}
		}
	]);