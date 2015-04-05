module.service('activityService', function ($http, $q, urlConfig, userService) {
	this.activityTypes = false;

	this.getActivities = function ()
	{
		var deferred = $q.defer();
		if (!this.activityTypes)
		{
			this._fetchActivities().then(
				function(data)
				{
					this.activityTypes = data;
					deferred.resolve(this.activityTypes)
				}.bind(this)
			);
		}
		else
		{
			deferred.resolve(this.activityTypes);
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