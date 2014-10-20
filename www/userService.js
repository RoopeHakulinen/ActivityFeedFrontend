module.service('userService', function () {
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

	this.setToken = function (token)
	{
		this.user["authentication-token"] = token;
	}

	this.getToken = function ()
	{
		return this.user["authentication-token"];
	};
});