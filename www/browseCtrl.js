app.controller("browseCtrl", function ($scope, $http, $q, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.activities = [];
	$scope.currentIndex = 0;
	$scope.activityTypes = [];
	$scope.selectedActivityType = {};

	$scope.initialize = function() {
		$scope.updateActivities(true);
		activityTypeService.getActivityTypes().then(
			function (activityTypes)
			{
				$scope.activityTypes = activityTypes;
			}
		);
		if (hidingSplashScreenNeeded)
		{
			setTimeout(
				navigator.splashscreen.hide,
				1000
			);
		}
	};

	$scope.invite = function(activity)
	{
		invitationService.send(activity.id).then(
			function ()
			{
				toast('BROWSE_INVITATION_SENT');
				activityService.handled(browseCarousel.getActiveCarouselItemIndex());
				$scope.updateActivities();
			},
			function()
			{
				toast('INVITATION_FAILED');
			});
	};

	$scope.skip = function(activity)
	{
		invitationService.skip(activity.id).then(
			function()
			{
				activityService.handled(browseCarousel.getActiveCarouselItemIndex());
				$scope.updateActivities();
			},
			function()
			{
				toast('INVITATION_FAILED');
			}
		);
	};

	$scope.updateActivities = function(fetchMore)
	{
		return activityService.getActivities(fetchMore || $scope.activities.length < 5, $scope.selectedActivityType.id).then(
			function(activities)
			{
				if (activities.length === 0)
				{
					setTimeout($scope.updateActivities.bind(this, true), 1000*30);
				}
				$scope.activities = angular.copy(activities);
			}.bind(this),
			function ()
			{
				setTimeout($scope.updateActivities.bind(this, true), 1000*20);
			}.bind(this)
		);
	};

	$scope.getCurrentActivityIndex = function()
	{
		return browseCarousel.getActiveCarouselItemIndex();
	};

	$scope.changed = function ($event)
	{
		$scope.currentIndex = $event.activeIndex;
	};

	$scope.overscrolled = function ($event)
	{
		if ($event.direction === "right") {
			commonLoader.show();
			$event.waitToReturn($scope.updateActivities(true).finally(
				function ()
				{
					commonLoader.hide();
					if ($scope.currentIndex + 1 < $scope.activities.length)
					{
						browseCarousel.setActiveCarouselItemIndex(browseCarousel.getActiveCarouselItemIndex() + 1);
					}
				})
			);
		}
	};

	$scope.showProfile = function (profile)
	{
		appNavigator.pushPage("templates/show-profile.html", {profile: profile});
	};

	$scope.showActivity = function (activity)
	{
		appNavigator.pushPage("templates/show-activity.html", {activity: activity});
	};

	ons.createPopover('popover.html', {parentScope: $scope}).then(
		function(popover) {
			$scope.popover = popover;
		}
	);

	$scope.showActivityTypePopover = function ($event)
	{
		$scope.popover.show($event.target);
	};

	$scope.changeActivityType = function (activityType)
	{
		if ($scope.selectedActivityType != activityType)
		{
			$scope.selectedActivityType = activityType;
			activityService.resetActivities();
			$scope.updateActivities(true);
		}
		$scope.popover.hide();
	};
});
