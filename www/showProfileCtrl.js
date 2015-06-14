app.controller("showProfileCtrl", function ($scope, directService, userService, $translate) {
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
				window.plugins.toast.showShortBottom(translate('DIRECT_ADDED'));
			},
			function()
			{
				window.plugins.toast.showShortBottom(translate('DIRECT_ADD_FAILED'));
			});
	};

	$scope.removeDirect = function()
	{
		directService.removeDirect($scope.profile.user_id).then(
			function ()
			{
				$scope.profile.is_direct = false;
				window.plugins.toast.showShortBottom(translate('DIRECT_REMOVED'));
			},
			function()
			{
				window.plugins.toast.showShortBottom(translate('DIRECT_REMOVE_FAILED'));
			});
	};

	$scope.hideDirect = function ()
	{
		return $scope.profile.user_id === userService.getId();
	};
});
