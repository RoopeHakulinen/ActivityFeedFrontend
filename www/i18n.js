app.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		BROWSE_SWIPE_FOR_MORE: 'Swipe to browse activities'
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
		PROFILE_FEEDBACK: 'Palaute (0-5)',
		PROFILE_PARTICIPATIONS: 'Osallistumista',
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