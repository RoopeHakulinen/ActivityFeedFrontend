module.controller("listActivitiesCtrl", function ($scope, $http, urlConfig) {

	$scope.activities = [];

	$scope.fetchActivities = function()
	{
		$http.get(
			urlConfig["activities"]
		).success(
			function(data)
			{
				$scope.activities = data;
				window.plugins.toast.showShortBottom('Activity list length ' + data.length);
			}
		).error(
			function()
			{
				window.plugins.toast.showShortBottom('Activity list fetching failed with status code ' + status);
			}
		);
	};
});