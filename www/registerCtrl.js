app.controller("registerCtrl", function ($scope, urlConfig, userService, $translate) {
	$scope.firstName = "";
	$scope.lastName = "";
	$scope.email = "";
	$scope.password = "";

	$scope.initialize = function(registeredDeferred) {
		$scope.registeredDeferred = registeredDeferred;
	};

	$scope.register = function()
	{
		if ($scope.email.length === 0 || $scope.password.length < 6)
		{
			window.plugins.toast.showShortBottom($translate.instant('SIGN_UP_FILL_IN'));
			return;
		}

		$http.post(
			urlConfig["users"],
			{
				email: $scope.email,
				password: $scope.password,
				profile:
				{
					firstName: $scope.firstName,
					lastName: $scope.lastName
				}
			}).then(
			function (user)
			{
				window.plugins.toast.showShortBottom($translate.instant('SIGN_UP_SUCCESS'));
				userService.setUser(user);
				$scope.registeredDeferred.resolve();
			},
			function()
			{
				window.plugins.toast.showShortBottom($translate.instant('SIGN_UP_FAILURE'));
			});
	};
});
