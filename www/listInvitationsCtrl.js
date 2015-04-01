module.controller("listInvitationsCtrl", function ($scope, $http, urlConfig, invitationService) {

	$scope.activities = [];

	$scope.fetchActivities = function()
	{
		$http.get(
			urlConfig["invitations"]
		).success(
			function(data)
			{
				$scope.activities = data;
				window.plugins.toast.showShortBottom('Invitation list length ' + data.length);
			}
		).error(
			function()
			{
				window.plugins.toast.showShortBottom('Invitation list fetching failed with status code ' + status);
			}
		);
	};

	$scope.accept = function()
	{
		invitationService.accept($scope.currentActivity.id).success(
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
		$scope.currentActivity.solved = true;
		$scope.showNext();
	};

	$scope.reject = function()
	{
		invitationService.reject($scope.currentActivity.id).success(
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
		$scope.currentActivity.solved = true;
		$scope.showNext();
	};

});