module.service('activityService', function ($http, urlConfig) {
	this.activities = [];

	this.getActivities = function ()
	{
		return this.activities;
	};


	this.skip = function (id)
	{
		return $http.post(urlConfig["activity"] + "/" + id + "/skip");
	};
});