module.service('userService', function () {
	this.setUser = function (user)
	{
		localStorage.setItem("user", JSON.stringify(user));
	};

	this.getUser = function ()
	{
		var stored = localStorage.getItem("user");
		if (typeof stored === "string")
		{
			return JSON.parse(stored);
		}
		return false;
	};

	this.getUsername = function ()
	{
		return this.getUser().username;
	};

	this.getFullname = function ()
	{
		return this.getUser().firstname + " " + this.getUser().lastname;
	};

	this.getId = function ()
	{
		return this.getUser().id;
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

		console.log("Logged out.");
		this.setUser(false);
		appNavigator.resetToPage("login.html");
	};
});