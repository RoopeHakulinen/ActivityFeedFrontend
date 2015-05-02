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

	this.setPosition = function (lat, lng)
	{
		this.position = {lat: lat, lng: lng};
		localStorage.setItem("lastKnownPosition", this.position);
	};

	this._positioningFailed = function (error)
	{
		alert("Paikannus epäonnistui. Käyttäjää ei pystytty paikantamaan. Koodi: " + error.code + ", viesti: " + error.message);
	};

	this._positioningCallback = function (position)
	{
		console.log("New location: (" + position.coords.latitude + ", " + position.coords.longitude + ")");
		this.setPosition(position.coords.latitude, position.coords.longitude);
	};

	this.initializePosition = function ()
	{
		if (localStorage.getItem("lastKnownPosition") !== null) // First check localStorage for latest position to quickly work right
		{
			this.setPosition(localStorage.getItem("lastKnownPosition").lat, localStorage.getItem("lastKnownPosition").lng)
		}
		navigator.geolocation.getCurrentPosition(
			function (position)
			{
				this._positioningCallback(position);
				this._updatePosition();
			}.bind(this),
			this._positioningFailed.bind(this),
			{enableHighAccuracy: false}
		);
	};

	this._updatePosition = function ()
	{
		navigator.geolocation.getCurrentPosition(
			this._positioningCallback.bind(this),
			this._positioningFailed.bind(this),
			{maximumAge: 1000*60*30, enableHighAccuracy: true}
		);
		setTimeout(this._updatePosition.bind(this), 1000*60*15);
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