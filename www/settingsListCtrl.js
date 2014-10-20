module.controller("settingsListCtrl", function ($scope, $http, $rootScope, settingsService) {
	$scope.availablePages = [
		{name: "General settings", target: "general-settings-page.html"},
		{name: "About", target: "about-page.html"}
	];

});