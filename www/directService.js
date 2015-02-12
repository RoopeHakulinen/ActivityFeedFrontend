module.service('directService', function ($http, $q, urlConfig) {
	this.directs = false;

	this.getDirects = function ()
	{
		var deferred = $q.defer();
		if (!this.directs)
		{
			this._fetchDirects().then(
				function(data)
				{
					this.directs = data;
					deferred.resolve(this.directs)
				}.bind(this)
			);
		}
		else
		{
			deferred.resolve(this.directs);
		}
		return deferred.promise;
	};

	this._fetchDirects = function ()
	{
		return $http.get();
	};

	this.addDirect = function (id)
	{
		return $http.post(urlConfig["direct"] + id + "/").success(
			function (data)
			{
				this.directs.push(data);
			}.bind(this)
		);
	};

	this.removeDirect = function (id)
	{
		return $http.delete(urlConfig["direct"] + id + "/").success(
			function (data)
			{
				this.directs.push(data);
			}.bind(this)
		);
	};
});