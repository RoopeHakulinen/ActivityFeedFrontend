app.run(function ($templateCache, $http) {
	$http.get('templates/_activity-card.html', { cache: $templateCache });
	$http.get('templates/about.html', { cache: $templateCache });
	$http.get('templates/browse.html', { cache: $templateCache });
	$http.get('templates/create-activity.html', { cache: $templateCache });
	$http.get('templates/edit-profile.html', { cache: $templateCache });
	$http.get('templates/forgot-password.html', { cache: $templateCache });
	$http.get('templates/list-invitations.html', { cache: $templateCache });
	$http.get('templates/login.html', { cache: $templateCache });
	$http.get('templates/main-menu.html', { cache: $templateCache });
	$http.get('templates/main-view.html', { cache: $templateCache });
	$http.get('templates/register.html', { cache: $templateCache });
	$http.get('templates/select-list.html', { cache: $templateCache });
	$http.get('templates/settings.html', { cache: $templateCache });
	$http.get('templates/my-activities.html', { cache: $templateCache });
	$http.get('templates/show-activity.html', { cache: $templateCache });
	$http.get('templates/show-profile.html', { cache: $templateCache });
});