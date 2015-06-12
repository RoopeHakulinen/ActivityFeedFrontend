module.controller("browseCtrl", function ($scope, $http, $q, urlConfig, activityService, activityTypeService, invitationService) {
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
	};

	$scope.invite = function(activity)
	{
		invitationService.send(activity.id).then(
			function ()
			{
				window.plugins.toast.showShortBottom('Invitation sent');
				activityService.handled(browseCarousel.getActiveCarouselItemIndex());
				$scope.updateActivities();
			},
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Invitation sending failed with status ' + status);
			});
	};

	$scope.skip = function(activity)
	{
		invitationService.skip(activity.id).then(
			function()
			{
				window.plugins.toast.showShortBottom('Activity rejected');
				activityService.handled(browseCarousel.getActiveCarouselItemIndex());
				$scope.updateActivities();
			},
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity rejecting failed with status ' + status);
			}
		);
	};

	$scope.updateActivities = function(fetchMore)
	{
		return activityService.getActivities(fetchMore || $scope.activities.length < 5).then(
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

	$scope._getOrganizerImage = function (activity)
	{
		try{
			var imageUrl = activity.organizer.picture;
		}
		catch (e)
		{ // Fall back to default image
			imageUrl = "styles/images/no-image.jpg";
		}
		return imageUrl;
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
		appNavigator.pushPage("show-profile.html", {profile: profile});
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
