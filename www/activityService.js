module.service('activityService', function ($http, $q, urlConfig, userService) {
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
		if (typeof type === "number")
		{
			url += type + "/";
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

	this.create = function (activityType, place, time)
	{
		return $http.post(urlConfig["activity"],
			{
				data:
				{
					activityType: activityType,
					place: place,
					time: time,
					user: userService.getId()
				}
			}
		);
	};


	this.skip = function (id)
	{
		return $http.post(urlConfig["activity"] + "/" + id + "/skip?userId=" + userService.getId());
	};
});