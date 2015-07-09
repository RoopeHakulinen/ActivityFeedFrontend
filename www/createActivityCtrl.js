app.controller("createActivityCtrl", function ($scope, $http, $q, urlConfig, activityService, activityTypeService, userService, directService, $translate) {
	$scope.activityTypes = [];

	$scope.activityType = {name: "", id: -1};
	$scope.locationName = "";
	$scope.lat = userService.getLocation().lat;
	$scope.lng = userService.getLocation().lng;
	$scope.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	$scope.from = new Date(1970, 0, 1, 17, 0, 0);
	$scope.to = new Date(1970, 0, 1, 18, 0, 0);
	$scope.message = "";
	$scope.participantCount = 2;
	$scope.requiredLevel = 0;

	$scope.initialize = function()
	{
		$scope.getActivityTypes();
	};

	$scope.getActivityTypes = function()
	{
		activityTypeService.getActivityTypes().then(function(activityTypes)
		{
			$scope.activityTypes = activityTypes;
		});
	};

	$scope.createActivity = function()
	{
		if ($scope.activityType.id === -1)
		{
			toast('CREATE_ACTIVITY_NO_ACTIVITY_TYPE');
			return;
		}
		if ($scope.locationName.length === 0)
		{
			toast('CREATE_ACTIVITY_NO_LOCATION');
			return;
		}
		$scope.showDirectMenu().then(
			function (directs) {
				commonLoader.show();

				directs = directs.map(
					function (direct)
					{
						return direct.id;
					}
				);
				activityService.create($scope.activityType.id, $scope.locationName, $scope.lat, $scope.lng, $scope.date + "T" + $scope.from, $scope.date + "T" + $scope.to, $scope.participantCount, $scope.requiredLevel, $scope.message, directs).success(
					function () {
						appNavigator.popPage();
						toast('CREATE_ACTIVITY_CREATED');
					}
				).error(
					function () {
						toast('CREATE_ACTIVITY_FAILED');
					}
				).finally(
					function () {
						commonLoader.hide();
					}
				);
			}
		);
	};

	$scope.showDirectMenu = function ()
	{
		var deferred = $q.defer();
		appNavigator.pushPage("templates/select-list.html", {name: $translate.instant('CREATE_ACTIVITY_SEND_INVITATION_FOR_DIRECTS'), dataPromise: directService.getDirects(), selection: [], deferred: deferred});
		return deferred.promise;
	};

	$scope.onLoaded = function () {
		console.log('Google Picker loaded!');
	};

	$scope.onPicked = function (docs) {
		angular.forEach(data.docs, function (file, index) {
			$scope.files.push(file);
		});
	};

	$scope.onCancel = function () {
		console.log('Google picker close/cancel!');
	};

	$scope.initialize();
});