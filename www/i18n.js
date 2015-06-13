app.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		ABOUT_TITLE: 'Activer, Activer Oy',
		ABOUT_VERSION: 'Version',
		ACTIVER: 'Activer',
		BROWSE_ALL_ACTIVITY_TYPES: 'All activity types',
		BROWSE_NO_ACTIVITIES: 'No activities found..',
		BROWSE_PARTICIPANTS: 'participants',
		BROWSE_SWIPE_FOR_MORE: 'Swipe to browse activities.',
		COMMON_ACTIVITY: 'Activity',
		COMMON_BACK: 'Back',
		COMMON_CANCEL: 'Cancel',
		COMMON_OK: 'Okay',
		COMMON_SIGN_OUT: 'Sign out',
		COMMON_UPDATE: 'Refresh',
		CREATE_ACTIVITY: 'Create an activity',
		CREATE_ACTIVITY_ACTIVITY_TYPE: 'Activity type',
		CREATE_ACTIVITY_LOCATION: 'Place',
		CREATE_ACTIVITY_LOCATION_NAME: 'Location name',
		CREATE_ACTIVITY_MAX_PARTICIPANTS: 'Max. participants',
		CREATE_ACTIVITY_MORE_INFORMATION: 'More information',
		CREATE_ACTIVITY_REQUIRED_LEVEL: 'Level required (0.0 - 5.0)',
		CREATE_ACTIVITY_TIME: 'Time',
		DIRECT_ADD: 'Add as a Direct',
		DIRECT_REMOVE: 'Remove from Directs',
		LOGIN_EMAIL: 'Email',
		LOGIN_FORGOT_PASSWORD: 'Forgot password?',
		LOGIN_PASSWORD: 'Password',
		LOGIN_SIGN_IN: 'Sign in',
		LOGIN_SIGN_IN_WITH_FACEBOOK: 'Sign in with Facebook',
		LOGIN_SIGNING_IN: 'Signing in',
		MENU_ABOUT: 'About',
		MENU_CREATE_ACTIVITY: 'Create an activity',
		MENU_INVITATIONS: 'Invitations',
		MENU_MY_ACTIVITIES: 'My activities',
		MENU_PROFILE: 'Profile',
		MENU_SETTINGS: 'Settings',
		PROFILE_AGE: 'Age',
		PROFILE_PARTICIPATIONS: 'Participations',
		PROFILE_RATING: 'Rating (0-5)',
		PROFILE_RATING_COUNT: 'Ratings',
		SETTINGS_RANGE: 'Distance',
		SETTINGS_SIGN_OUT: 'Sign out from Activer',
		SHOW_ACTIVITY_COMMENT: 'Comment',
		SHOW_ACTIVITY_WRITE_A_COMMENT: 'Write a comment',
		SIGN_OUT_CONFIRMATION_TEXT: 'Are you sure you want to sign out?'
	});

	$translateProvider.translations('fi', {
		ABOUT_TITLE: 'Activer, Activer Oy',
		ABOUT_VERSION: 'Versio',
		ACTIVER: 'Activer',
		BROWSE_ALL_ACTIVITY_TYPES: 'Kaikki lajit',
		BROWSE_NO_ACTIVITIES: 'Ei aktiviteetteja..',
		BROWSE_PARTICIPANTS: 'osallistujaa',
		BROWSE_SWIPE_FOR_MORE: 'Pyyhkäise ruutua selataksesi aktiviteetteja.',
		COMMON_ACTIVITY: 'Aktiviteetti',
		COMMON_BACK: 'Takaisin',
		COMMON_CANCEL: 'Peruuta',
		COMMON_OK: 'Ok',
		COMMON_SIGN_OUT: 'Kirjaudu ulos',
		COMMON_UPDATE: 'Päivitä',
		CREATE_ACTIVITY: 'Luo aktiviteetti',
		CREATE_ACTIVITY_ACTIVITY_TYPE: 'Aktiviteettityyppi',
		CREATE_ACTIVITY_LOCATION: 'Paikka',
		CREATE_ACTIVITY_LOCATION_NAME: 'Sijainnin nimi',
		CREATE_ACTIVITY_MAX_PARTICIPANTS: 'Maksimiosallistujamäärä',
		CREATE_ACTIVITY_MORE_INFORMATION: 'Lisätietoja',
		CREATE_ACTIVITY_REQUIRED_LEVEL: 'Vaadittu taso (0.0 - 5.0)',
		CREATE_ACTIVITY_TIME: 'Aika',
		DIRECT_ADD: 'Lisää Directiksi',
		DIRECT_REMOVE: 'Poista Directeistä',
		LOGIN_EMAIL: 'Sähköpostiosoite',
		LOGIN_FORGOT_PASSWORD: 'Unohditko salasanasi?',
		LOGIN_PASSWORD: 'Salasana',
		LOGIN_SIGN_IN: 'Kirjaudu sisään',
		LOGIN_SIGN_IN_WITH_FACEBOOK: 'Kirjaudu sisään Facebookin avulla',
		LOGIN_SIGNING_IN: 'Kirjaudutaan sisään',
		MENU_ABOUT: 'Tietoja',
		MENU_CREATE_ACTIVITY: 'Luo aktiviteetti',
		MENU_INVITATIONS: 'Kutsut',
		MENU_MY_ACTIVITIES: 'Minun aktiviteettini',
		MENU_PROFILE: 'Profiili',
		MENU_SETTINGS: 'Asetukset',
		PROFILE_AGE: 'Ikä',
		PROFILE_PARTICIPATIONS: 'Osallistumista',
		PROFILE_RATING: 'Palaute (0-5)',
		PROFILE_RATING_COUNT: 'Arvostelua',
		SETTINGS_RANGE: 'Etäisyys',
		SETTINGS_SIGN_OUT: 'Kirjaudu ulos Activerista',
		SHOW_ACTIVITY_COMMENT: 'Kommentoi',
		SHOW_ACTIVITY_WRITE_A_COMMENT: 'Kirjoita kommentti',
		SIGN_OUT_CONFIRMATION_TEXT: 'Oletko varma, että haluat kirjautua ulos?'
	});

	var preferredLanguage = localStorage.getItem("language");
	if (preferredLanguage === null)
	{
		preferredLanguage = 'fi';
	}
	$translateProvider.preferredLanguage(preferredLanguage);
});