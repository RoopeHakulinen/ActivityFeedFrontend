TEST_ENABLED = true;

var serverUrl = "https://api.activer.net/";
if (TEST_ENABLED)
{
	serverUrl = "https://test.activer.net/";
}

module.constant(
	"urlConfig",
	{
		"login": serverUrl + "users/sign_in",
		"facebookCallback": serverUrl + "users/facebook/",
		"activity": serverUrl + "activity/",
		"activities": serverUrl + "activities/",
		"activityTypes": serverUrl + "activity_types/",
		"suggestions": serverUrl + "suggestions/",
		"profile": serverUrl + "profile/",
		"direct": serverUrl + "direct/"
	}

);