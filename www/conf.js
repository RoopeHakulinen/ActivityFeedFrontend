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
		"facebookCallback": serverUrl + "users/auth/facebook/callback",
		"activity": serverUrl + "activity/",
		"activityTypes": serverUrl + "activity_types/",
		"invitations": serverUrl + "invitations/",
		"profile": serverUrl + "profile/",
		"direct": serverUrl + "direct/"
	}

);