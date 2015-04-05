module.service('activityTypeService', function ($http, $q, urlConfig) {
	this.activityTypes = false;

	this.getActivityTypes = function ()
	{
		var deferred = $q.defer();
		if (!this.activityTypes)
		{
			this._fetchActivityTypes().then(
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

	this._fetchActivityTypes = function (type)
	{
		var deferred = $q.defer();
		$http.get(urlConfig["activityTypes"]).success(
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
});