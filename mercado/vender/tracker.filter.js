angular.
	module('core').
	filter('track', function($log, trackerDataService) {
		return function (callback, namespace, categoria, evento) {

			var evento = {
				namespace: namespace,
				categoria: categoria,
				evento: evento
			};
			
			trackerDataService.save(evento).then(
				function (response) {
					$log.info(response);
				});
		};
	});