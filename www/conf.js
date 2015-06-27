ENV = "test"; // "localhost", "test" or "production"

var serverUrl;
if (ENV === "localhost")
{
	serverUrl = 'http://localhost:3000/';
}
else if (ENV === "test")
{
	serverUrl = 'https://test.activer.net/';
}
else if (ENV === "production")
{
	serverUrl = 'https://api.activer.net/';
}

app.constant(
	"urlConfig",
	{
		"user": serverUrl + "user",
		"login": serverUrl + "users/sign_in",
		"facebookCallback": serverUrl + "users/facebook/",
		"activity": serverUrl + "activity/",
		"activities": serverUrl + "activities/",
		"myActivities": serverUrl + "activities/my",
		"activityTypes": serverUrl + "activity_types/",
		"suggestions": serverUrl + "suggestions/",
		"profile": serverUrl + "profile/",
		"directs": serverUrl + "directs/"
	}
);

app.constant(
	"defaultLanguage",
	"fi"
);