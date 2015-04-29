module.service('settingsService', function (fileSystemService, userService) {
	this.settings = {};
	var DEFAULT_SETTIMGS = {
		range: 50
	};
	this.setItem = function (key, value) {
		this.settings[key] = value;
	};

	this.getItem = function (key) {
		var value = this.settings[key];
		if (typeof value === "undefined")
		{
			return DEFAULT_SETTINGS[key];
		}
		return value;
	};

	this.getRange = function ()
	{
		return this.getItem("range");
	};

	this.setRange = function (range)
	{
		this.setItem("range", range);
	};

	this.loadUserSettings = function ()
	{
		console.log("Reading users settings file.");
		var readFinished = function (text)
		{
			if (typeof text === "string" && text.length > 0) {
				this.settings = JSON.parse(text);
				console.log("Read settings: " + text);
			}
			else
			{
				this.settings = DEFAULT_SETTIMGS;
				console.log("Using default settings");
			}
		}.bind(this);
		fileSystemService.readFile(userService.getId() + "-settings.json", readFinished);
	};

	this.save = function()
	{
		console.log("Writing users settings file. Settings as JSON: " + JSON.stringify(this.settings));
		fileSystemService.writeFile(userService.getId() + "-settings.json", JSON.stringify(this.settings));
	};
});