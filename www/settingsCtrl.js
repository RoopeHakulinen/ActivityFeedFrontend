module.controller("settingsCtrl", function ($scope, settingsService) {

	$scope.getX = function ()
	{
		return settingsService.getItem("X");
	};

	$scope.$on("$destroy", function handler() {
		console.log("Storing settings. ");
		$scope.storeSettings();
	});

	$scope.storeSettings = function()
	{
		settingsService.save();
	};
});