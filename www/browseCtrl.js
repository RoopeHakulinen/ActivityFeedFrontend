module.controller("browseCtrl", function ($scope, $http, $q, settingsService, urlConfig, activityService, invitationService) {
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

	$scope.sendInvitation = function()
	{
		$q.when(invitationService.send($scope.currentActivity.id)).then(
			function (data)
			{
				window.plugins.toast.showShortBottom('Invitation sent');
				$scope.currentActivity.solved = true;
				$scope.showNext();
			},
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Invitation sending failed with status ' + status);
			});
	};

	$scope.skip = function()
	{
		$q.when(activityService.skip($scope.currentActivity.id)).then(
			function(data)
			{
				window.plugins.toast.showShortBottom('Activity rejected');
				$scope.currentActivity.solved = true;
				$scope.showNext();
			},
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity rejecting failed with status ' + status);
			}
		);
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