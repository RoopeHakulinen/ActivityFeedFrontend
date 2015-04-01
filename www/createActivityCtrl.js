module.controller("createActivityCtrl", function ($scope, $http, urlConfig, activityService, activityTypeService) {

	$scope.activityType = {name: "", id: -1};
	$scope.place = "";
	$scope.time = 0;

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
});