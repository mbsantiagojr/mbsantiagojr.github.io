angular
	.module("perfilVenda")
	.factory("dataService", ["$http", function ($http) {
		return {
			getJson: function() {
				return $http.get("/madeira/venda/venda/getPerfilJSON.do");
			},
			
			post: function(perfil, participante) { 
				// Passagem de parametros deve ser feita assim, pois se enviarmos o objeto temos problema para pegar os parametros na action
				var requestObj = {
						perfil: angular.toJson(perfil)
				};
				
				requestObj = $.extend(requestObj, participante);
				
				return $http.post("/madeira/venda/venda/salvaPerfil.do", $.param(requestObj), {
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				});
			},
			
			getPaises: function() {
				return $http.get("/madeira/common/produto/capturaPaises.do");
			},
			
			getCategoriasProdutos: function () {
				return $http.get("/madeira/common/produto/listaCategoriasProdutosBVRio.do");
			},
			
			getEspeciesAutex: function (autex) {
				return $http.get("/madeira/venda/venda/pegaEspeciesDisponiveisAutex.do?autex=" + autex);
			},
			
			verificaFSCC: function (codigoFSC) {
				return $http.post("/madeira/venda/venda/verificaFSCC.do", $.param({codigoFSC: codigoFSC}), {
					headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
				});
			}
		};
	}]);