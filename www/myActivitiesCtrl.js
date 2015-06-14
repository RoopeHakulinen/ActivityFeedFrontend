app.controller("myActivitiesCtrl", function ($scope, activityService, activityTypeService, userService) {
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
				$scope.activities = data.activities;
			},
			function()
			{
				toast('COMMON_LIST_FAILED');
			}
		);
	};

	$scope.showActivity = function (activity)
	{
		appNavigator.pushPage("show-activity.html", {activity: activity});
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

	$scope.getDuration = function (from, to)
	{
		return Date.parse(from) - Date.parse(to);
	};
});