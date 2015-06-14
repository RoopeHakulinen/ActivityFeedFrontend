app.controller("showProfileCtrl", function ($scope, directService, userService) {
	$scope.profile = {};

	$scope.initialize = function(profile) {
		$scope.profile = profile;
	};

	$scope.addAsDirect = function()
	{
		directService.addAsDirect($scope.profile.user_id).then(
			function ()
			{
				$scope.profile.is_direct = true;
				toast('DIRECT_ADDED');
			},
			function()
			{
				toast('DIRECT_ADD_FAILED');
			});
	};

	$scope.removeDirect = function()
	{
		directService.removeDirect($scope.profile.user_id).then(
			function ()
			{
				$scope.profile.is_direct = false;
				toast('DIRECT_REMOVED');
			},
			function()
			{
				toast('DIRECT_REMOVE_FAILED');
			});
	};

	$scope.hideDirect = function ()
	{
		return $scope.profile.user_id === userService.getId();
	};
});
