app.controller("loginCtrl", function ($scope, $http, $q, fileSystemService, userService, urlConfig, activityTypeService, eventService) {
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
					hidingSplashScreenNeeded = true;
					$scope.signedIn();
				}
				else
				{
					navigator.splashscreen.hide();
					hidingSplashScreenNeeded = false;
				}
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
		activityTypeService.getActivityTypes();
		eventService.initializePushNotifications();
		appNavigator.pushPage("templates/main-view.html");
		loginLoader.hide();
	};

	$scope.facebookLogin = function()
	{
		loginLoader.show();
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
						loginLoader.hide();
						alert("Facebook auth callback error: " + data);
					}
				);
			}, function(err) {
				console.error("Could not get user data token: " + JSON.stringify(err));
			});
		};

		var error = function(error)
		{
			alert("Facebook login failed: " + error);
		};

		facebookConnectPlugin.login(["public_profile", "email"], success, error)
	};

	$scope.register = function ()
	{
		var registeredDeferred = $q.defer();
		appNavigator.pushPage('templates/sign-up.html', {registeredDeferred: registeredDeferred});
		registeredDeferred.promise.then(
			function ()
			{
				$scope.signedIn();
			}
		)
	};
});