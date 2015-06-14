app.controller("registerCtrl", function ($scope, $http, urlConfig, userService) {
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
			toast('SIGN_UP_FILL_IN');
			return;
		}

		$http.post(
			urlConfig["users"],
			{
				email: $scope.email,
				password: $scope.password,
				profile:
				{
					name: $scope.firstName + " " + $scope.lastName
				}
			}).then(
			function (user)
			{
				toast('SIGN_UP_SUCCESS');
				userService.setUser(user);
				$scope.registeredDeferred.resolve();
			},
			function()
			{
				toast('SIGN_UP_FAILURE');
			});
	};
});
