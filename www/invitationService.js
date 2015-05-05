module.service('invitationService', function ($http, $q, urlConfig) {
	this.invitations = [];

	this.getInvitations = function ()
	{
		return $http.get(
			urlConfig["suggestions"]
		);
		var deferred = $q.defer();
		if (this.invitations.length == 0)
		{
			this._fetchInvitations().then(
				function(data)
				{
					this.invitations = data;
					deferred.resolve(this.invitations)
				}.bind(this)
			);
		}
		else
		{
			deferred.resolve(this.invitations);
		}
		return deferred.promise;
	};

	this._fetchInvitations = function ()
	{
		var deferred = $q.defer();
		$http.get(urlConfig["suggestions"]).success(
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

	this.accept = function (id)
	{
		return $http({
			method: "PUT",
			url: urlConfig["suggestions"] + id,
			data: {
				suggestion: {
					status: 2
				}
			}
		});
	};

	this.reject = function (id)
	{
		return $http({
			method: "PUT",
			url: urlConfig["suggestions"] + id,
			data: {
				suggestion: {
					status: 3
				}
			}
		});
	};
});