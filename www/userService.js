module.service('userService', function () {
	this.setUser = function (user)
	{
		localStorage.setItem("user", user);
	};

	this.getUser = function ()
	{
		return localStorage.getItem("user");
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

		console.log("Logged out.");
		this.setUser(false);
		appNavigator.resetToPage("login.html");
	};
});