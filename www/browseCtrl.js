module.controller("browseCtrl", function ($scope, $http, $q, settingsService, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.currentActivity = {};
	$scope.currentActivityType = false;

	$scope.initialize = function()
	{
		$scope.showNext();
	};

	$scope.sendInvitation = function()
	{
		$q.when(invitationService.send($scope.currentActivity.id)).then(
			function (data)
			{
				window.plugins.toast.showShortBottom('Invitation sent');
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
		$scope.currentActivity = activityService.getActivities()[0];
	};
});