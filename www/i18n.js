app.config(function ($translateProvider) {
	$translateProvider.translations('en', {
		BROWSE_SWIPE_FOR_MORE: 'Swipe to browse activities',
		FOO: 'This is a paragraph.',
		BUTTON_LANG_EN: 'english',
		BUTTON_LANG_DE: 'german'
	});
	$translateProvider.translations('fi', {
		BROWSE_SWIPE_FOR_MORE: 'Pyyhkäise ruutua selataksesi aktiviteetteja.',
		FOO: 'Dies ist ein Paragraph.',
		BUTTON_LANG_EN: 'englisch',
		BUTTON_LANG_DE: 'deutsch'
	});
	$translateProvider.preferredLanguage('fi');
});