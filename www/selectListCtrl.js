module.controller("selectListCtrl", function ($scope) {
	$scope.data = {};
	$scope.name = "";
	$scope.selection = [];

	$scope.initialize = function(options)
	{
		$scope.name = options.name;
		$scope.selection = options.selection; // Contains only ids
		options.dataPromise.then(
			function (data)
			{
				$scope.data = data; // Each object should have id and name
			}
		);
		$scope.deferred = options.deferred;
	};

	// Toggle selection for a given id
	$scope.toggleSelection = function toggleSelection(id) {
		var index = $scope.selection.indexOf(id);
		if (index > -1) { // Is currently selected
			$scope.selection.splice(index, 1);
		}
		else {
			$scope.selection.push(id);
		}
	};

	$scope.ok = function()
	{
		var list = $scope.data.filter(
			function (item)
			{
				return $scope.selection.indexOf(item.id) !== -1;
			}
		);
		$scope.deferred.resolve(list);
		appNavigator.popPage();
	};

	$scope.cancel = function ()
	{
		$scope.deferred.reject();
		appNavigator.popPage();
	};
});
