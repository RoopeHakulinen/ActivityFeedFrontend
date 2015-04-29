module.service('activityService', function ($http, $q, urlConfig, userService, settingsService) {
	this.activities = [];

	this.getActivities = function ()
	{
		var deferred = $q.defer();
		if (this.activities.length < 5)
		{
			this._fetchActivities().then(
				function(data)
				{
					this.activities = data;
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

	this._fetchActivities = function (type)
	{
		var deferred = $q.defer();
		var url = urlConfig["activities"];

		// If there is activity type specified, append that as parameter
		if (typeof type === "number")
		{
			url += type + "/";
		}

		// Add location stuff AKA lat, lng and range
		var loc = userService.getLocation();
		url += "?lat=" + loc.lat + "&lng=" + loc.lng + "&range=" + settingsService.getRange();

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

	this.create = function (activityType, locationName, lat, lng, from, to, participantCount, requiredLevel, message)
	{
		return $http.post(urlConfig["activity"],
			{
				data:
				{
					activity_type_id: activityType.id,
					location_name: locationName,
					from: from,
					to: to,
					lat: lat,
					lng: lng,
					participant_count: participantCount,
					required_level: requiredLevel,
					message: message
				}
			}
		);
	};

	this.invite = function (id)
	{
		return this.createSuggestion(id, 1);
	};

	this.skip = function (id)
	{
		return this.createSuggestion(id, 0);
	};

	this.createSuggestion = function(id, status)
	{
		return $http({
			method: 'POST',
			url: urlConfig["activities"] + "/" + id + "/suggestions",
			data: {
				suggestion: {
					status: status
				}
			}
		}).success(function() {
			this.handled();
		}.bind(this));
	};

	this.handled = function()
	{
		this.activities.splice(1,0);
	}
});