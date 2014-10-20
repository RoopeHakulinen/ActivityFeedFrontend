module.controller("mainMenuCtrl", function ($scope, $http, settingsService) {
	$scope.availablePages = [
		{name: "General settings", target: "general-settings-page.html"},
		{name: "About", target: "about-page.html"}
	];
});