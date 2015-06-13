TEST_ENABLED = true;

var serverUrl = "https://api.activer.net/";
if (TEST_ENABLED)
{
	serverUrl = "https://test.activer.net/";
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