module.controller("mainMenuCtrl", function ($scope, $http, invitationService) {

	$scope.getInvitationsCount = function()
	{
		invitationService.getInvitationsCount();
	};
});