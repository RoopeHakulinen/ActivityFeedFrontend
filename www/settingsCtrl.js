module.controller("settingsCtrl", function ($scope, userService) {
	$scope.range = userService.getRange();

	$scope.logout = function ()
	{
		userService.logout(true);
	};

	$scope.$on("$destroy", function () {
		userService.setRange($scope.range);
	});
});