module.controller("createActivityCtrl", function ($scope, $http, urlConfig, activityService, activityTypeService) {
	$scope.activityTypes = [];

	$scope.activityType = {name: "", id: -1};
	$scope.locationName = "";
	$scope.lat = "61.498172";
	$scope.lng = "23.761092";
	$scope.from = "17:00";
	$scope.to = "18:00";
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
		commonLoader.show();

		activityService.create($scope.activityType.id, $scope.locationName, $scope.lat, $scope.lng, $scope.from, $scope.to, $scope.participantCount, $scope.requiredLevel, $scope.message).success(
			function()
			{
				window.plugins.toast.showShortBottom('Activity successfully added.');
				commonLoader.hide();
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity creation failed with status ' + status);
				commonLoader.hide();
			}
		);
	};

	$scope.initialize();
});