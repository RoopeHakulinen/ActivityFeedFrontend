module
	.filter("asDate", function () {
		return function (input) {
			return new Date(input);
		}
	});