var app = angular.module('app', ['onsen', 'pascalprecht.translate'], function() {

});

String.prototype.splice = function( idx, rem, s ) {
	return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};


app.factory('authHttpRequestInterceptor', function (userService) {
	return {
		request: function (config) {
			// Adjust the JSON API
			config.headers['Content-type'] = 'application/json';
			config.headers['Accept'] = 'application/json';


			// Adjust authorization if so
			var user = userService.getUser();
			if (user)
			{
				config.headers['X-User-Email'] = user["email"];
				config.headers['X-User-Token'] = user["authentication_token"];
			}
			return config;
		}
	};
});

app.config(function ($httpProvider) {
	$httpProvider.interceptors.push('authHttpRequestInterceptor');
	$httpProvider.interceptors.push(function($q) {
		return {
			responseError: function(rejection) {
				if(rejection.status == 0) {
					toast('COMMON_CONNECTION_PROBLEM');
				}
				return $q.reject(rejection);
			}
		};
	});
});

app.filter('ageFilter', function () {
	function calculateAge (birthday) { // birthday is a date
		var date = new Date(birthday);
		var ageDifMs = Date.now() - date.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	return function (birthdate) {
		return calculateAge(birthdate);
	};
});
