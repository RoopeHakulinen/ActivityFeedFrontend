module.controller("listInvitationsCtrl", function ($scope, urlConfig, invitationService, activityTypeService) {
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

	$scope.accept = function(invitation)
	{
		invitationService.accept(invitation.id).success(
			function()
			{
				window.plugins.toast.showShortBottom('Activity accepted');
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity accepting failed with status ' + status);
			}
		);
	};

	$scope.reject = function()
	{
		invitationService.reject(invitation.id).success(
			function()
			{
				window.plugins.toast.showShortBottom('Activity rejected');
			}
		).error(
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity rejecting failed with status ' + status);
			}
		);
	};

	$scope.getActivityTypeName = function(id)
	{
		return activityTypeService.getName(id);
	};

	$scope.getDuration = function (from, to)
	{
		return Date.parse(from) - Date.parse(to);
	};

});