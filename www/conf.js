TEST_ENABLED = true;

var serverUrl = "https://api.activer.net/";
if (TEST_ENABLED)
{
	serverUrl = "https://r.activer.net/"; // Refers to local machine in DNS
}

module.constant(
	"urlConfig",
	{
		"login": serverUrl + "users/sign_in",
		"facebookCallback": serverUrl + "users/auth/facebook/callback"
	}

);