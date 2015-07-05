app.controller("registerCtrl", function ($scope, $http, urlConfig, userService) {
	$scope.email = "";
	$scope.password = "";
	$scope.firstName = "";
	$scope.lastName = "";

	$scope.initialize = function(registeredDeferred) {
		$scope.registeredDeferred = registeredDeferred;
	};

	$scope.register = function()
	{
		if ($scope.email.length === 0 || $scope.password.length < 6)
		{
			toast('COMMON_FILL_ALL');
			return;
		}

		$http.post(
			urlConfig["users"],
			{
				user:
				{
					email: $scope.email,
					password: $scope.password,
					profile: {
						name: $scope.firstName + " " + $scope.lastName
					}
				}
			}).then(
			function (data)
			{
				toast('REGISTER_SUCCESS');
				userService.setUser(data.data);
				$scope.registeredDeferred.resolve();
			},
			function()
			{
				toast('REGISTER_FAILURE');
			});
	};
});
