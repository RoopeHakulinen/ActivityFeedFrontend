app.controller("settingsCtrl", function ($scope, userService, defaultLanguage) {
	$scope.range = userService.getRange();
	$scope.language = defaultLanguage;

	$scope.logout = function ()
	{
		userService.logout(true);
	};

	$scope.initializeLanguage = function ()
	{
		var language = localStorage.getItem("language");
		if (language !== null)
		{
			$scope.language = language;
		}
	};

	$scope.$on("$destroy", function () {
		userService.setRange($scope.range);
		if ($scope.language !== defaultLanguage)
		{
			localStorage.setItem("language", $scope.language);
		}
	});
});