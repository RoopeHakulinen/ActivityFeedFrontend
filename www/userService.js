module.service('userService', function () {
	this.position = {lat: 0, lng: 0};

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
		return this.position;
	};

	this.setPosition = function (position)
	{
		console.log("New location: (" + position.coords.latitude + ", " + position.coords.longitude + ")");
		this.position = {lat: position.coords.latitude, lng: position.coords.longitude};
	};

	this.positioningFailed = function (error)
	{
		alert("Paikannus epäonnistui. Käyttäjää ei pystytty paikantamaan. Koodi: " + error.code + ", viesti: " + error.message);
	};

	this.initializePosition = function ()
	{
		navigator.geolocation.getCurrentPosition(
			function (position)
			{
				this.setPosition(position);
				this.updatePosition();
			}.bind(this),
			this.positioningFailed.bind(this),
			{enableHighAccuracy: false}
		);
		this.updatePosition();
	};

	this.updatePosition = function ()
	{
		navigator.geolocation.getCurrentPosition(
			this.setPosition.bind(this),
			this.positioningFailed.bind(this),
			{maximumAge: 1000*60*30, enableHighAccuracy: true}
		);
		setTimeout(this.updatePosition.bind(this), 1000*60*15);
	};


	this.logout = function (force)
	{
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