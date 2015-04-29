module.service("eventService", function (userService) {

	this.logout = function()
	{
		userService.logout();
	};

	document.addEventListener("backbutton", function (e){
		var currentPage = appNavigator.getCurrentPage();
		if (confirmationModal._element[0].style.display !== "none")
		{
			confirmationModal.hide();
			e.preventDefault();
		}
		else if (currentPage.name.indexOf("main-view") !== -1) // If we are on survey view
		{
			this.logout();
			e.preventDefault();
		}
		else if (currentPage.name.indexOf("login") !== -1)
		{
			navigator.app.exitApp();
		}
		else
		{
			console.log("Pop page.");
		}
	}.bind(this), false);

	document.addEventListener('deviceready', function onDeviceReady() {
		console.log("Got deviceready.");
		window.deviceReady = true;
		window.alert = function (msg)
		{
			navigator.notification.alert(
				msg,
				function ()
				{
				},
				'Activer',
				"OK"
			);
		};
		userService.initializePosition();
	}, false);

	document.addEventListener('online', function() {
		console.log("Got online event.");
		function checkForDeviceReady()
		{
			if (deviceReady)
			{

			}
			else
			{
				setTimeout(checkForDeviceReady.bind(this), 100)
			}
		}
		checkForDeviceReady();
	}.bind(this), false);

	document.addEventListener('offline', function() {
		console.log("Got offline event.");
		//window.plugins.toast.showShortBottom('Connection lost');
	}, false);
});