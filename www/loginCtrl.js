module.controller("loginCtrl", function ($scope, $http, settingsService, fileSystemService, userService, urlConfig) {
	$scope.email = "";
	$scope.password = "";

	if (TEST_ENABLED)
	{
		$scope.email = "roope.hakulinen@gmail.com";
		$scope.password = "password";
	}

	$scope.initialize = function()
	{
		var interval = setInterval(function ()
		{
			if (deviceReady) {
				if (userService.getUser())
				{
					$scope.signedIn();
				}
				setTimeout(function ()
				{
					navigator.splashscreen.hide();
				}, 200);
				clearInterval(interval);
			}
		}, 50);
	};

	$scope.login = function () {
		console.log("Trying to log in with email " + $scope.email);
		loginLoader.show();
		$http(
			{
				method: "POST",
				url: urlConfig["login"],
				data: {user: {"email": $scope.email, "password": $scope.password}}
			})
			.success(function (data) {
				$scope.loginSuccess(data);
			}).error(function () {
				console.log("Login failed.");
				loginLoader.hide();
			});
	};

	$scope.loginSuccess = function (user)
	{
		userService.setUser(user);
		$scope.signedIn();
	};

	$scope.signedIn = function()
	{
		console.log("Login succeeded.");
		settingsService.loadUserSettings();
		appNavigator.pushPage("main-view.html", {});
		loginLoader.hide();
	};

	$scope.facebookLogin = function()
	{
		var success = function(authData)
		{
			facebookConnectPlugin.api(authData.authResponse.userID + "?fields=id,email,name,picture,gender,birthday", ["public_profile", "email", "user_birthday"], function(data) {
				$http(
					{
						method: "POST",
						url: urlConfig["facebookCallback"],
						headers: {
							'Content-type': 'application/json',
							'Accept': 'application/json'
						},
						data: data
					}).success(
					function (data)
					{
						$scope.loginSuccess(data);
					}
				).error(
					function(data)
					{
						alert("Facebook auth callback error: " + data);
					}
				);
			}, function(err) {
				console.error("Could not get user data token: " + err);
			});
		};

		var error = function(error)
		{
			alert("Facebook login failed: " + error);
		};

		facebookConnectPlugin.login(["public_profile", "email"], success, error)
	};
});