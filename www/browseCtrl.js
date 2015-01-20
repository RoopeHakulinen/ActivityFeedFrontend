module.controller("browseCtrl", function ($scope, $http, settingsService, urlConfig) {
	$scope.currentActivity = {};
	$scope.activities = [];

	$scope.initialize = function()
	{
		$scope.fetchActivities();
	};

	$scope.fetchActivities = function()
	{
		var lastId = 0;
		if ($scope.activities.length > 0)
		{
			lastId = $scope.activities[$scope.activities.length - 1].id;
		}

		$http.get(
			urlConfig["activities"],
			{
				lastId: lastId
			}
		).success(
			function(data)
			{
				$scope.activities.splice(-1, 0, data);
				$scope.showNext();
				window.plugins.toast.showShortBottom('Activities retrieved');
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity retrieving failed with status ' + status);
			}
		);
	};

	$scope.accept = function()
	{
		$http.post(
				urlConfig["activity"] + "/" + $scope.currentActivity.id + "/accept"
		).success(
			function()
			{
				window.plugins.toast.showShortBottom('Activity accepted');
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity accepting failed with status ' + status);
			}
		);
		$scope.currentActivity.solved = true;
		$scope.showNext();
	};

	$scope.reject = function()
	{
		$http.post(
				urlConfig["activity"] + "/" + $scope.currentActivity.id + "/reject"
		).success(
			function()
			{
				window.plugins.toast.showShortBottom('Activity rejected');
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity rejecting failed with status ' + status);
			}
		);
		$scope.currentActivity.solved = true;
		$scope.showNext();
	};

	$scope.showNext = function()
	{
		if (!$scope.currentActivity || $scope.currentActivity.solved)
		{
			$scope.activities.splice(0, 1);
			if ($scope.activities.length === 0) {
				$scope.currentActivity = {};
			}
			else {
				$scope.currentActivity = $scope.activities[0];
				$scope.currentActivity.solved = false;
			}
		}
	};
});