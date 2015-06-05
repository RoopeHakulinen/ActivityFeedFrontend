module.controller("showProfileCtrl", function ($scope, userService) {
	$scope.profile = {};

	$scope.initialize = function(profile) {
		$scope.profile = profile;
	};

	$scope.addAsDirect = function()
	{
		userService.addAsDirect($scope.profile.user_id).then(
			function ()
			{
				$scope.profile.is_direct = true;
				window.plugins.toast.showShortBottom('Direct lisätty.');
			},
			function()
			{
				window.plugins.toast.showShortBottom('Adding as direct failed.');
			});
	};

	$scope.removeDirect = function()
	{
		userService.removeDirect($scope.profile.user_id).then(
			function ()
			{
				$scope.profile.is_direct = false;
				window.plugins.toast.showShortBottom('Direct lisätty.');
			},
			function()
			{
				window.plugins.toast.showShortBottom('Adding as direct failed.');
			});
	};
});
