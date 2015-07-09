app.factory('helpers', function(){
	return {
		resolveProfilePicture: function(profile) {
			try{
				var imageUrl = profile.picture;
				if (imageUrl === null)
				{
					throw {};
				}
			}
			catch (e)
			{ // Fall back to default image
				imageUrl = "styles/images/no-image.jpg";
			}
			return imageUrl;
		}
	}
});

app.run(function($rootScope, helpers){
	$rootScope.helpers = helpers;
});