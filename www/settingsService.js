module.service('settingsService', function (fileSystemService, userService) {
	this.settings = {};


	this.setItem = function (key, value) {
		this.settings[key] = value;
	};

	this.getItem = function (key) {
		return this.settings[key];
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
				this.settings = {

				};
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