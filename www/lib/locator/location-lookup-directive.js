app
	.directive('locationLookup', [
		function() {
			return {
				restrict: 'E',
				require: '?ngModel',
				templateUrl: 'lib/locator/location-lookup.html',
				scope: {
					callback: '&'
				},
				link: function(scope, iElement, iAttrs, model) {
					scope.limitTo = scope.$eval(iAttrs.limitTo) || 15;
					scope.results = [];
					scope.value = "";

					// Generate a DOM elment for Google Places Service
					var elem = document.createElement('div');
					elem.setAttribute('id', scope.ID);

					// Setup Google Places Service
					var googlePlacesService = new google.maps.places.PlacesService(iElement[0].appendChild(elem));

					// Clear query and results
					scope.clear = function() {
						scope.results = [];
					};

					// Pick A Location
					scope.pickLocation = function(location) {
						// Get details for the selected location
						googlePlacesService.getDetails({
							reference: location.reference
						}, function(place, status) {

							scope.$apply(function() {

								var locData = {
									name: location.terms[0].value,
									description: location.description,
									latitude: place.geometry.location.lat(),
									longitude: place.geometry.location.lng()
								};

								// Callback
								scope.callback({location: locData});
								scope.clear();
								scope.value = locData.description;
								// Update model
								model.$setViewValue(locData.description);
							});
						});
					};
				}
			}
		}
	]);