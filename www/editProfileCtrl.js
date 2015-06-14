app.controller("editProfileCtrl", function ($scope, $http, urlConfig, userService) {
	$scope.user = userService.getUser();

	$scope.$on("$destroy", function () {
		$http.put(urlConfig["profile"], $scope.user.profile).then(
			function (user)
			{
				toast('EDIT_PROFILE_UPDATED');
				userService.setUser(user);
			}
		);
	});
});