module.controller("loginCtrl", function ($scope, $http, settingsService, fileSystemService, userService, urlConfig) {
	$scope.email = "";
	$scope.password = "";

	if (TEST_ENABLED)
	{
		$scope.email = "asd@asd.com";
		$scope.password = "password";
	}

	$scope.credentialsFileName = "credentials.json";

	$scope.login = function () {
		console.log("Trying to log in with email " + $scope.email);
		loginLoader.show();
		$http(
			{
				method: "POST",
				url: urlConfig["login"],
				data: {user: {"email": $scope.email, "password": $scope.password}},
				headers: {
					'Content-type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.success(function (data) {
				$scope.loginSuccess(data);
			}).error(function () {
				console.log("Login failed.");
			});
	};

	$scope.loginSuccess = function (user)
	{
		userService.setUser(user);
		console.log("Login succeeded.");
		settingsService.loadUserSettings();
		appNavigator.pushPage("main-view.html", {});
		loginLoader.hide();
	};

	$scope.facebookLogin = function()
	{
		var success = function(userData)
		{
			$http(
				{
					method: "GET",
					url: urlConfig["facebookCallback"] + "?code=" + encodeURIComponent(userData.authResponse.accessToken),
					headers: {
						'Content-type': 'application/json',
						'Accept': 'application/json'
					}
				}).success(
				function (data)
				{
					alert(data);
					$scope.loginSuccess(data);
				}
			).error(
				function(data)
				{
					alert("Facebook auth callback error: " + data);
				}
			);
		};

		var error = function(error)
		{
			alert("Facebook login failed: " + error);
		};

		facebookConnectPlugin.login(["public_profile", "email"], success, error)
	};
});