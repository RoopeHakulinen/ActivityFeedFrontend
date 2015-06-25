app.controller("listInvitationsCtrl", function ($scope, urlConfig, invitationService) {
	$scope.invitations = [];

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
				toast('COMMON_LIST_FAILED');
			}
		);
	};

	$scope.accept = function(invitation, index)
	{
		invitationService.accept(invitation.id).success(
			function()
			{
				toast('INVITATION_ACCEPTED');
				$scope.invitations.splice(index, 1);
			}
		).error(
			function()
			{
				toast('INVITATION_FAILED');
			}
		);
	};

	$scope.reject = function(invitation, index)
	{
		invitationService.reject(invitation.id).success(
			function()
			{
				toast('INVITATION_REJECTED');
				$scope.invitations.splice(index, 1);
			}
		).error(
			function()
			{
				toast('INVITATION_FAILED');
			}
		);
	};

	$scope.showActivity = function (activity)
	{
		appNavigator.pushPage("templates/show-activity.html", {activity: activity});
	};

	$scope.getDuration = function (from, to)
	{
		return Date.parse(from) - Date.parse(to);
	};
});