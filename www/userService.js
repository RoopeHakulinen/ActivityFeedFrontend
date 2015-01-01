module.service('userService', function ($http, urlConfig) {
	this.user = {};

	this.setUser = function (user)
	{
		this.user = user;
	};

	this.getUser = function ()
	{
		return this.user;
	};

	this.getUsername = function ()
	{
		return this.user.username;
	};

	this.getFullname = function ()
	{
		return this.user.firstname + " " + this.user.lastname;
	};

	this.getId = function ()
	{
		return this.user.id;
	};

	this.logout = function (force)
	{
		window.plugins.toast.showShortBottom("Logging out.");
		if (typeof force === "undefined")
		{
			force = false;
		}
		if (!force && !confirm("Are you sure you want to log out?"))
		{
			return;
		}
		console.log("Logging out.");

		$http.get(urlConfig["logout"]).success(
			function(data, status, headers, config)
			{
				window.plugins.toast.showShortBottom("Logged out successfully");
			}.bind(this)
		).error(
			function(data, status, headers, config)
			{
				console.log("Logging out failed.");
				// Do nothing as this can be intentional
			}
		);

		console.log("Logged out.");
		this.setUser({});
		appNavigator.resetToPage("login.html");
	};
});