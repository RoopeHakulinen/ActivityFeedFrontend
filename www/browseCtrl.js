module.controller("browseCtrl", function ($scope, $http, $q, settingsService, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.currentActivity = {};
	$scope.currentActivityType = false;

	$scope.initialize = function()
	{
		$scope.showNext();
	};

	$scope.sendInvitation = function()
	{
		invitationService.send($scope.currentActivity.id).then(
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
		activityService.skip($scope.currentActivity.id).then(
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
		activityService.getActivities().then(
			function(activities)
			{
				if (activities.length === 0)
				{
					setTimeout(this.showNext.bind(this), 1000);
					$scope.currentActivity = {};
				}
				$scope.currentActivity = activities[0];
			}.bind(this)
		);
	};

	$scope._getOrganizerImage = function ()
	{
		try{
			var imageUrl = $scope.currentActivity.organizer.profile.picture;
		}
		catch (e)
		{ // Fall back to default image
			imageUrl = "http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/a8/55/a855bf4d4292f3428df5284ba5620643.jpg?itok=S73UMWZ9";
		}
		return imageUrl;
	};

	$scope._getActivityTypeStyles = function()
	{
		if (typeof this.currentActivity.activity_type_id !== "undefined")
		{
			return activityTypeService.getStyles(this.currentActivity.activity_type_id);
		}
	};

	$scope.initialize();
});
