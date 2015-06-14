app.controller("showActivityCtrl", function ($scope, urlConfig, activityService) {
	$scope.activity = {};
	$scope.comment = "";

	$scope.initialize = function(activity) {
		$scope.activity = activity;
	};

	$scope.sendComment = function()
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
				$scope.activity.comments.push(data);
			},
			function()
			{
				toast('SHOW_ACTIVITY_COMMENTING_FAILED');
			});
	};
});
