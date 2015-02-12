TEST_ENABLED = true;

var serverUrl = "https://api.activer.net/";
if (TEST_ENABLED)
{
	serverUrl = "https://192.168.59.103/"; // Refers to local machine in DNS
}

module.constant(
	"urlConfig",
	{
		"login": serverUrl + "users/sign_in",
		"facebookCallback": serverUrl + "users/auth/facebook/callback",
		"activity": serverUrl + "activity/",
		"activities": serverUrl + "activities/",
		"invitations": serverUrl + "invitations/",
		"profile": serverUrl + "profile/",
		"direct": serverUrl + "direct/"
	}

);