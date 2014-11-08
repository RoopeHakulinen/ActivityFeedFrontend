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
				console.log("Login failed. Trying local login.");
				$scope.tryLocalLogin();
			});
	};

	$scope.loginSuccess = function (user)
	{
		userService.setUser(user);
		console.log("Login succeeded.");
		settingsService.loadUserSettings();
		$scope.storeCredentialsForOffline();
		appNavigator.pushPage("main-view.html", {});
		loginLoader.hide();
	};

	$scope.facebookLogin = function()
	{
		var success = function(userData)
		{
			alert(urlConfig["facebookCallback"]);
			$http.get(
				urlConfig["facebookCallback"]
			).success(
				function (data)
				{
					$scope.loginSuccess(data);
					alert("UserInfo: " + JSON.stringify(userData));
				}
			).error(
				function(data)
				{
					alert("Facebook auth callback error: " + data);
				});
		};

		var error = function(error)
		{
			alert("Facebook login failed: " + error);
		};

		facebookConnectPlugin.login(["public_profile"], success, error)
	};


	$scope.storeCredentialsForOffline = function ()
	{
		var readFinished = function (data)
		{
			var credentials = [];
			if (data && data.length > 0)
			{
				console.log("Data is " + data);
				credentials = JSON.parse(data);
			}
			credentials.push(userService.getUser());
			console.log("Storing user account " + userService.getFullname() + " for offline usage.");
			fileSystemService.writeFile($scope.credentialsFileName, JSON.stringify(credentials));
		};
		fileSystemService.readFile($scope.credentialsFileName, readFinished);
	};

	$scope.tryLocalLogin = function()
	{
		// Get credentials.json
		var checkOfflineAccess = function (data)
		{
			if (!data || data.length == 0) // If no credentials found, can't have offline access
			{
				return;
			}
				var credentials = JSON.parse(data);
			console.log("Read credentials: \n" + credentials.join(",\n"));
			for (var i in credentials)
			{
				var user = credentials[i];
				if (user.email.toLowerCase() === $scope.email && user.password === $scope.password)
				{
					$scope.loginSuccess(user);
					return;
				}
			}

			// If ended up in here, the login failed. Show alert and let user try again
			alert("Login failed, please check your email and password.");
			loginLoader.hide();
		};
		fileSystemService.readFile($scope.credentialsFileName, checkOfflineAccess);
	};
});