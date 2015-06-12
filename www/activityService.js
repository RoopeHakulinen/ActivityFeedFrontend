module.service('activityService', function ($http, $q, urlConfig, userService) {
	this.activities = [];

	this.getActivities = function (fetchMore, type)
	{
		var deferred = $q.defer();
		if (fetchMore)
		{
			this._fetchActivities(type).then(
				function (data) {
					this.activities = this.activities.concat(data);
					deferred.resolve(this.activities)
				}.bind(this)
			);
		}
		else
		{
			deferred.resolve(this.activities);
		}
		return deferred.promise;
	};

	this.resetActivities = function ()
	{
		this.activities = [];
	};

	this._fetchActivities = function (activityTypeId)
	{
		var deferred = $q.defer();
		var url = urlConfig["activities"];


		// Add location stuff AKA lat, lng and range
		var loc = userService.getLocation();
		var history = JSON.stringify(this.activities.map(function(item) { return item.id; })); // Add only the ids in the history
		url += "?lat=" + loc.lat + "&lng=" + loc.lng + "&range=" + userService.getRange() + "&history=" + history;

		// If there is activity type specified, append that as parameter
		if (typeof activityTypeId === "number")
		{
			url += "&activity_type_id=" + activityTypeId;
		}

		$http.get(url).success(
			function (data)
			{
				deferred.resolve(data);
			}
		).error(
			function ()
			{
				deferred.reject();
			}
		);
		return deferred.promise;
	};

	this.getActivity = function (activity)
	{
		var deferred = $q.defer();
		var url = urlConfig["activities"] + activity.id + "/";
		$http.get(url).success(
			function (data)
			{
				deferred.resolve(data);
			}
		).error(
			function ()
			{
				deferred.reject();
			}
		);
		return deferred.promise;
	};

	this.getMyActivities = function ()
	{
		var deferred = $q.defer();
		var url = urlConfig["myActivities"];
		$http.get(url).success(
			function (data)
			{
				deferred.resolve(data);
			}
		).error(
			function ()
			{
				deferred.reject();
			}
		);
		return deferred.promise;
	};

	this.create = function (activityTypeId, locationName, lat, lng, from, to, participantCount, requiredLevel, message, directs)
	{
		return $http.post(urlConfig["activities"],
			{
				activity: {
					activity_type_id: activityTypeId,
					location_name: locationName,
					from: from,
					to: to,
					lat: lat,
					lng: lng,
					participant_count: participantCount,
					required_level: requiredLevel,
					message: message,
					directs: directs
				}
			}
		);
	};

	this.sendComment = function (activityId, comment)
	{
		return $http.post(urlConfig["activities"] + activityId + "/comments",
			{
				comment: {
					text: comment
				}
			}
		);
	};

	this.handled = function()
	{
		this.activities.splice(1,0);
	}
});