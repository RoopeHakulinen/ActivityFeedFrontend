app.service("eventService", function ($http, urlConfig, userService, translate) {

	this.logout = function()
	{
		userService.logout();
	};

	this.initializePushNotifications = function ()
	{
		function registerDevice(system, id)
		{
			$http.put(urlConfig["user"], {user: {notification_system: system, notification_id: id}});
		}

		// iOS
		onNotificationAPN = function (event) {
			if (event.alert)
			{
				navigator.notification.alert(event.alert);
			}

			if (event.sound)
			{
				var snd = new Media(event.sound);
				snd.play();
			}

			if (event.badge)
			{
				window.plugins.pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
			}
		};

		// Android
		onNotification = function (e) {
			console.warn('EVENT -> RECEIVED:' + e.event);

			switch(e.event)
			{
				case 'registered':
					if (e.regid.length > 0)
					{
						console.warn('REGISTERED -> REGID:' + e.regid);
						registerDevice("Gcm", e.regid);
						// Your GCM push server needs to know the regID before it can push to this device
						// here is where you might want to send it the regID for later use.
						console.warn("regID = " + e.regid);
					}
					break;

				case 'message':
					// if this flag is set, this notification happened while we were in the foreground.
					// you might want to play a sound to get the user's attention, throw up a dialog, etc.
					if (e.foreground)
					{
						console.warn('--INLINE NOTIFICATION--');

						// on Android soundname is outside the payload.
						// On Amazon FireOS all custom attributes are contained within payload
						//var soundfile = e.soundname || e.payload.sound;
						// if the notification contains a soundname, play it.
						//var my_media = new Media("/android_asset/www/"+ soundfile);
						//my_media.play();
					}
					else
					{  // otherwise we were launched because the user touched a notification in the notification tray.
						if (e.coldstart)
						{
							console.warn('--COLDSTART NOTIFICATION--');
						}
						else
						{
							console.warn('--BACKGROUND NOTIFICATION--');
						}
					}

					console.warn('MESSAGE -> MSG: ' + e.payload.message);
					//Only works for GCM
					console.warn('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
					//Only works on Amazon Fire OS
					console.warn('MESSAGE -> TIME: ' + e.payload.timeStamp);
					break;

				case 'error':
					console.warn('ERROR -> MSG:' + e.msg);
					break;

				default:
					console.warn('EVENT -> Unknown, an event was received and we do not know what it is');
					break;
			}
		};

		function tokenHandler (result)
		{
			console.warn("Got Apns token " + result);
			registerDevice("Apns", result);
		}

		function successHandler (result) {
			console.warn('result = ' + result);
		}

		function errorHandler (error) {
			console.warn('error = ' + error);
		}
		
		if (device.platform == 'android' || device.platform == 'Android')
		{
			window.plugins.pushNotification.register(
				successHandler,
				errorHandler,
				{
					"senderID":"613253068886",
					"ecb":"onNotification"
				});
		}
		else
		{
			window.plugins.pushNotification.register(
				tokenHandler,
				errorHandler,
				{
					"badge":"true",
					"sound":"true",
					"alert":"true",
					"ecb":"onNotificationAPN"
				});
		}
	};

	document.addEventListener("backbutton", function (e){
		var currentPage = appNavigator.getCurrentPage();
		if (confirmationModal._element[0].style.display !== "none")
		{
			confirmationModal.hide();
			e.preventDefault();
		}
		else if (mainMenu.isMenuOpened())
		{
			mainMenu.closeMenu();
			e.preventDefault();
		}
		else if (currentPage.name.indexOf("main-view") !== -1) // If we are on survey view
		{
			this.logout();
			appNavigator.popPage();
			e.preventDefault();
		}
		else if (currentPage.name.indexOf("login") !== -1)
		{
			e.preventDefault();
			navigator.app.exitApp();
		}
		else
		{
			console.log("Pop page.");
		}
	}.bind(this), false);

	document.addEventListener('deviceready', function () {
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
	}.bind(this), false);

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
		window.plugins.toast.showShortBottom(translate('COMMON_CONNECTION_LOST'));
	}, false);
});