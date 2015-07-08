app.controller("showActivityCtrl", function ($scope, urlConfig, activityService, userService) {
	$scope.activity = {};
	$scope.comment = "";

	$scope.initialize = function (activity)
	{
		$scope.activity = activity;
	};

	$scope.allowCommenting = function ()
	{
		var participants = $scope.activity.participants;
		for (var i in participants)
		{
			if (participants[i].id === userService.getId())
			{
				return true;
			}
		}
		return false;
	};

	$scope.sendComment = function ()
	{
		if ($scope.comment.length === 0)
		{
			toast('SHOW_ACTIVITY_COMMENT_EMPTY');
			return;
		}

		activityService.sendComment($scope.activity.id, $scope.comment).then(
			function (data)
			{
				$scope.comment = "";
				$scope.activity.comments.push(data.data);
			},
			function()
			{
				toast('SHOW_ACTIVITY_COMMENTING_FAILED');
			});
	};

	$scope.showProfile = function (profile)
	{
		appNavigator.pushPage("templates/show-profile.html", {profile: profile});
	};

	$scope.showActivity = function (activity)
	{
		// Do nothing
	};

	$scope._getOrganizerImage = function (activity)
	{
		try{
			var imageUrl = activity.organizer.picture;
		}
		catch (e)
		{ // Fall back to default image
			imageUrl = "styles/images/no-image.jpg";
		}
		return imageUrl;
	};
});
