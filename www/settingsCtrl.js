module.controller("settingsCtrl", function ($scope, userService, settingsService) {
	$scope.range = settingsService.getRange();

	$scope.logout = function ()
	{
		userService.logout(true);
	};

	$scope.$on("$destroy", function handler() {
		console.log("Storing settings. ");
		$scope.storeSettings();
	});

	$scope.storeSettings = function()
	{
		settingsService.setRange($scope.range);
		settingsService.save();
	};
});