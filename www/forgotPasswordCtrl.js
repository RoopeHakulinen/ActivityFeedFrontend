app.controller("forgotPasswordCtrl", function ($scope, $http, urlConfig) {
	$scope.email = "";

	$scope.sendNewPassword = function()
	{
		if ($scope.email.length === 0)
		{
			toast('COMMON_FILL_ALL');
			return;
		}

		$http.post(
			urlConfig["password"] + "?user[email]=" + $scope.email,
			{
				'user[email]': $scope.email
			}).then(
			function ()
			{
				toast('FORGOT_PASSWORD_DONE');
				appNavigator.popPage();
			},
			function()
			{
				toast('FORGOT_PASSWORD_FAILURE');
			});
	};
});
