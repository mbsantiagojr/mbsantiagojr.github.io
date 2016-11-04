angular.
	module('core').
	filter("translate", function () {
	return function (key) {
		return translate(key);
	};
});