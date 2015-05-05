module.service('invitationService', function ($http, $q, urlConfig) {
	this.invitations = [];

	this.getInvitations = function ()
	{
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

	this.send = function (id)
	{
		return this._createSuggestion(id, 1);
	};

	this.skip = function (id)
	{
		return this._createSuggestion(id, 0);
	};

	this._createSuggestion = function(id, status)
	{
		return $http({
			method: 'POST',
			url: urlConfig["activities"] + id + "/suggestions",
			data: {
				suggestion: {
					status: status
				}
			}
		});
	};

	this.accept = function (id)
	{
		return this._updateSuggestion(id, 2);
	};

	this.reject = function (id)
	{
		return this._updateSuggestion(id, 3);
	};

	this._updateSuggestion = function(id, status)
	{
		return $http({
			method: 'PUT',
			url: urlConfig["suggestions"] + id,
			data: {
				suggestion: {
					status: status
				}
			}
		});
	};
});