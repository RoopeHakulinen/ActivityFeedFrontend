module.controller("showActivityCtrl", function ($scope, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.activity = {};
	$scope.comment = "";

	$scope.initialize = function(activity) {
		$scope.activity = activity;
	};

	$scope.sendComment = function()
	{
		if ($scope.comment.length === 0)
		{
			window.plugins.toast.showShortBottom('Kommentti ei voi olla tyhjä.');
			return;
		}

		activityService.sendComment($scope.activity.id, $scope.comment).then(
			function (data)
			{
				$scope.activity.comments.push(data);
			},
			function()
			{
				window.plugins.toast.showShortBottom('Comment sending failed with status ' + status);
			});
	};
});
