module.service('userService', function () {
	var geolocation = {lat: 0, lng: 0};

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

	this.getLocation = function ()
	{
		return geolocation;
	};

	this.setGeolocation = function (position)
	{
		console.log("New location: (" + position.coords.latitude + ", " + position.coords.longitude + ")");
		geolocation = {lat: position.coords.latitude, lng: position.coords.longitude};
	};

	this.updateGeolocation = function ()
	{
		navigator.geolocation.getCurrentPosition(this.setGeolocation.bind(this),
			function ()
			{
				alert("Paikannus epäonnistui. Käyttäjää ei pystytty paikantamaan.");
			},
			{enableHighAccuracy: true}
		);

		setTimeout(this.updateGeolocation.bind(this), 60*15); // Update geolocation every 15 minutes.
	};

	this.getRange = function ()
	{
		return 500;
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