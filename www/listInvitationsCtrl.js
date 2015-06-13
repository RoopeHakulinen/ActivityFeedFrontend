app.controller("listInvitationsCtrl", function ($scope, urlConfig, invitationService, activityTypeService) {
	$scope.invitations = [];//invitationService.getInvitations();

	$scope.initialize = function ()
	{
		$scope.fetchInvitations();
	};

	$scope.fetchInvitations = function()
	{
		invitationService.getInvitations().then(
			function(data)
			{
				$scope.invitations = data;
			},
			function()
			{
				window.plugins.toast.showShortBottom('Invitation list fetching failed with status code ' + status);
			}
		);
	};

	$scope.accept = function(invitation, index)
	{
		invitationService.accept(invitation.id).success(
			function()
			{
				window.plugins.toast.showShortBottom('Invitation accepted');
				$scope.invitations.splice(index, 1);
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Invitation accepting failed with status ' + status);
			}
		);
	};

	$scope.reject = function(invitation, index)
	{
		invitationService.reject(invitation.id).success(
			function()
			{
				window.plugins.toast.showShortBottom('Invitation rejected');
				$scope.invitations.splice(index, 1);
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Invitation rejecting failed with status ' + status);
			}
		);
	};

	$scope.showActivity = function (activity)
	{
		appNavigator.pushPage("show-activity.html", {activity: activity});
	};

	$scope.getDuration = function (from, to)
	{
		return Date.parse(from) - Date.parse(to);
	};

});