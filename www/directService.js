app.service('directService', function ($http, $q, urlConfig) {
	this.directs = false;

	this.getDirects = function ()
	{
		var deferred = $q.defer();
		if (!this.directs)
		{
			$http.get(urlConfig["directs"]).then(
					function (data) {
						this.directs = data.data;
						deferred.resolve(this.directs);
					}.bind(this)
				);
		}
		else
		{
			deferred.resolve(this.directs);
		}
		return deferred.promise;
	};

	this.addAsDirect = function (userId)
	{
		return $http.post(urlConfig["directs"],
			{
				direct: {
					direct_id: userId
				}
			}
		);
	};

	this.removeDirect = function (userId)
	{
		return $http.del(urlConfig["directs"] + userId);
	};
});