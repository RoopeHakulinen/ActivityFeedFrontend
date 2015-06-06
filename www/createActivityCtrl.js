module.controller("createActivityCtrl", function ($scope, $http, $q, urlConfig, activityService, activityTypeService, userService, directService) {
	$scope.activityTypes = [];

	$scope.activityType = {name: "", id: -1};
	$scope.locationName = "";
	$scope.lat = userService.getLocation().lat;
	$scope.lng = userService.getLocation().lng;
	$scope.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	$scope.from = new Date(1970, 0, 1, 17, 0, 0);
	$scope.to = new Date(1970, 0, 1, 18, 0, 0);
	$scope.message = "";
	$scope.participantCount = 2;
	$scope.requiredLevel = 0;

	$scope.initialize = function()
	{
		$scope.getActivityTypes();
	};

	$scope.getActivityTypes = function()
	{
		activityTypeService.getActivityTypes().then(function(activityTypes)
		{
			$scope.activityTypes = activityTypes;
		});
	};

	$scope.createActivity = function()
	{
		$scope.showDirectMenu().then(
			function () {
				commonLoader.show();

				activityService.create($scope.activityType.id, $scope.locationName, $scope.lat, $scope.lng, $scope.date + "T" + $scope.from, $scope.date + "T" + $scope.to, $scope.participantCount, $scope.requiredLevel, $scope.message).success(
					function () {
						window.plugins.toast.showShortBottom('Activity successfully added.');
					}
				).error(
					function (data, status) {

						window.plugins.toast.showShortBottom('Activity creation failed with status ' + status);
					}
				).finally(
					function () {
						commonLoader.hide();
					}
				);
			}
		);
	};

	$scope.showDirectMenu = function ()
	{
		var deferred = $q.defer();
		appNavigator.pushPage("select-list.html", {name: "Lähetä kutsu Directeille", data: directService.getDirects(), selection: [], deferred: deferred});
		return deferred.promise;
	};

	$scope.initialize();
});