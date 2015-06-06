module.service('directService', function ($http, urlConfig) {
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