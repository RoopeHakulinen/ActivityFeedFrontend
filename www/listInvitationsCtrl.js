module.controller("listInvitationsCtrl", function ($scope, $http, urlConfig) {

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

	$scope.accept = function(invitation)
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

	$scope.reject = function(invitation)
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

});