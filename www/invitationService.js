module.service('invitationService', function ($http, $q, urlConfig) {
	this.invitations = false;

	this.getInvitations = function ()
	{
		var deferred = $q.defer();
		if (!this.invitations)
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
		return $http.get();
	};

	this.getInvitationsCount = function ()
	{
		var deferred = $q.defer();
		this.getInvitations().then(
			function (invitations)
			{
				deferred.resolve(invitations.length);
			}.bind(this)
		);
		return deferred.promise;
	};

	this.send = function (id)
	{
		return $http.post(urlConfig["invitation"] + "/" + id + "/sendInvitation");
	};


	this.accept = function (id)
	{
		return $http.post(urlConfig["invitation"] + "/" + id + "/accept");
	};

	this.reject = function (id)
	{
		return $http.post(urlConfig["invitation"] + "/" + id + "/reject");
	};
});