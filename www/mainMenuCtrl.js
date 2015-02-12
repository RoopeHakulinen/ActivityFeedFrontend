module.controller("mainMenuCtrl", function ($scope, $http, invitationsService) {

	$scope.getInvitationsCount = function()
	{
		invitationsService.getInvitationsCount();
	};
});