module.service('directService', function ($http, urlConfig) {
	this.directs = this.getDirects();

	this.getDirects = function ()
	{
		if (typeof this.directs === "undefined")
		{
			return $http.get(urlConfig["directs"]);
		}
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