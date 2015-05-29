module.controller("browseCtrl", function ($scope, $http, $q, settingsService, urlConfig, activityService, activityTypeService, invitationService) {
	$scope.activities = [];


	ons.ready(function() {
		browseCarousel.on('overscroll', function(e) {
			if (e.direction === "right") {
				var deferred = $q.defer();
				e.waitToReturn(deferred.promise);
				window.setTimeout(function () {
					deferred.resolve();
				}, 2500);
			}
		})
	});

	$scope.invite = function(activity)
	{
		invitationService.send(activity.id).then(
			function ()
			{
				window.plugins.toast.showShortBottom('Invitation sent');
				activityService.handled();
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
				activityService.handled();
				$scope.updateActivities();
			},
			function(data, status)
			{
				window.plugins.toast.showShortBottom('Activity rejecting failed with status ' + status);
			}
		);
	};

	$scope.updateActivities = function()
	{
		activityService.getActivities().then(
			function(activities)
			{
				if (activities.length === 0)
				{
					setTimeout(this.updateActivities.bind(this), 1000*30);
				}
				$scope.activities = angular.copy(activities);
			}.bind(this),
			function ()
			{
				setTimeout(this.updateActivities.bind(this), 1000*20);
			}.bind(this)
		);
	};

	$scope._getOrganizerImage = function (activity)
	{
		try{
			var imageUrl = activity.organizer.profile.picture;
		}
		catch (e)
		{ // Fall back to default image
			imageUrl = "http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/a8/55/a855bf4d4292f3428df5284ba5620643.jpg?itok=S73UMWZ9";
		}
		return imageUrl;
	};

	$scope._getActivityTypeStyles = function(activity)
	{
		if (typeof activity.activity_type_id !== "undefined")
		{
			return activityTypeService.getStyles(activity.activity_type_id);
		}
		return "";
	};
});
