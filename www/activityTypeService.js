app.service('activityTypeService', function ($http, $q, urlConfig) {
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

	this.getStyles = function(id)
	{
		var activityType = this._findActivityTypeById(id);
		if (activityType && typeof activityType.styles === "string")
		{
			return activityType.styles;
		}
		return "";
	};

	this.getName = function (id)
	{
		var activityType = this._findActivityTypeById(id);
		if (activityType && typeof activityType.name === "string")
		{
			return activityType.name;
		}
		return "";
	};

	this.getActivityType = function (id)
	{
		return this._findActivityTypeById(id);
	};

	this._findActivityTypeById = function (id)
	{
		if (!!this.activityTypes && typeof id === "number")
		{
			var activityTypes = this.activityTypes.filter(function(item) {
				return item.id === id;
			});
			if (activityTypes.length === 1)
			{
				return activityTypes[0];
			}
		}
		return false;
	};
});