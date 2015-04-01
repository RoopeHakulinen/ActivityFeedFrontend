var module = angular.module('app', ['onsen'], function() {

});

String.prototype.splice = function( idx, rem, s ) {
	return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};


module.factory('authHttpRequestInterceptor', function (userService) {
	return {
		request: function (config) {
			var user = userService.getUser();
			if (user)
			{
				config.headers['X-Auth-Email'] = user["email"];
				config.headers['X-Auth-Token'] = user["authentication_token"];
			}
			return config;
		}
	};
});

module.config(function ($httpProvider) {
	$httpProvider.interceptors.push('authHttpRequestInterceptor');
});