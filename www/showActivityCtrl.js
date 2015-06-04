module.controller("showActivityCtrl", function ($scope, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.activity = {};
	$scope.comment = "";

	$scope.initialize = function(activity) {
		$scope.activity = activity;
	};

	$scope.comment = function()
	{
		activityService.comment(activity.id, comment).then(
			function ()
			{
				activity.comments.push(comment);
			},
			function()
			{
				window.plugins.toast.showShortBottom('Comment sending failed with status ' + status);
			});
	};

});
