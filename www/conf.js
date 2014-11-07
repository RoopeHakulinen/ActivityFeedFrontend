TEST_ENABLED = true;

var serverUrl = "http://localhost:3000/";
if (TEST_ENABLED)
{
	serverUrl = "http://localhost:3000/";
}

module.constant(
	"urlConfig",
	{
		"login": serverUrl + "users/sign_in",
		"facebookCallback": serverUrl + "users/auth/facebook/callback"
	}

);