module.controller("createActivityCtrl", function ($scope, $http, urlConfig, activityService, activityTypeService) {
	$scope.activityTypes = [];

	$scope.activityType = {name: "", id: -1};
	$scope.place = "";
	$scope.time = "12:00";

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

		activityService.create($scope.activityType.id, $scope.place, $scope.time).success(
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