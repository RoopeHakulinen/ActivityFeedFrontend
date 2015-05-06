module.controller("myActivitiesCtrl", function ($scope, activityService, activityTypeService, userService) {
	$scope.activities = [];

	$scope.initialize = function ()
	{
		$scope.fetchActivities();
	};

	$scope.fetchActivities = function()
	{
		activityService.getMyActivities().then(
			function(data)
			{
				$scope.activities = data;
			},
			function()
			{
				window.plugins.toast.showShortBottom('My activities list fetching failed with status code ' + status);
			}
		);
	};

	$scope.ownActivity = function (activity)
	{
		return activity.organizer.id === userService.getId();
	};
	$scope.pendingActivity = function (activity)
	{
		return !$scope.ownActivity(activity) && activity.suggestions[0].status === "invited";
	};
	$scope.participatingInActivity = function (activity)
	{
		return !$scope.ownActivity(activity) && activity.suggestions[0].status === "match";
	};

});