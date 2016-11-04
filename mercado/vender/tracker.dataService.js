angular.module("core")
	.factory("trackerDataService", ["$http", function ($http) {
		return {
			save: function(evento) { 
				return $http.post("/madeira/venda/venda/salvaAcaoUsuario.do", $.param(evento), {
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				});
			}
		};
	}]);