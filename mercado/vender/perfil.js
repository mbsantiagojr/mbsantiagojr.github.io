var app = angular.module("perfilVenda", ["ngAnimate", "ngSanitize", "ui.utils.masks", "core", "ui.bootstrap", "thatisuday.dropzone"]);

app.controller("perfil", function ($scope, $log, $locale, dataService) {
	// Configura separador de casas decimais
	$locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
	$locale.NUMBER_FORMATS.GROUP_SEP = ".";
	
	// Atributos auxiliares para exibicao dos produtos
	$scope.listaProdutos = []; // produtos;
	
	dataService.getCategoriasProdutos().then(function (response) {
		$scope.listaProdutos = response.data.data;
	});
	
	$scope.listaProdutosSelecionados = [];
	$scope.listaEspecies = jsonespecies.especies;
	
	$scope.editandoEspecie = "";
	
	$scope.autex = {
		estado: "",
		numero: "",
		ano: "",
		id: ""
	};
	
	$scope.autexDesconhecida = false;
	
	$scope.isLogado = isLogado;
	$scope.certificacaoValida = null;
	$scope.verificandoFSC = false;
	$scope.saving = false;
	$scope.ultimaCertificacao = "";
	
	$scope.oneAtATime = true;
	$scope.status = {
		isCustomHeaderOpen: false,
	    isFirstOpen: true,
	    isFirstDisabled: false
	};
	
	 $scope.dz = {
	     options: { // passed into the Dropzone constructor
	    	 url: '/madeira/venda/venda/uploadAutex.do',
	    	 paremName: 'autex',
	    	 maxFilesize: '10', // MB
	    	 acceptedFiles: 'image/jpeg, images/jpg, application/pdf, application/x-pdf, image/png',
	    	 addRemoveLinks: true,
	    	 dictDefaultMessage: "Arreste para o campo abaixo as AUTEX que não pudemos encontrar. Em até 48 horas nós abasteceremos seu perfil com as informações dos documentos fornecidos."
	     },
	     callbacks: {
	    	 addedfile: function (file) {
	    		$log.info(file);
	    		$scope.newFile = file;
	    		
	    		var thumbnail = $('.dropzone .dz-preview.dz-file-preview .dz-image:last');

	    	    switch (file.type) {
	    	      case 'application/pdf':
	    	        thumbnail.css('background', 'url(/js/third-party/angular/ng-dropzone/pdf.png)');
	    	        break;
	    	      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
	    	        thumbnail.css('background', 'url(img/doc.png)');
	    	        break;
	    	    }
	    	    thumbnail.css('background-size', '100% 100%');
	    	 },
	    	 success: function (file, xhr) {
	    		 // $log.info(file.name, xhr);
	    		 var response = JSON.parse(xhr);
	    		 var chave = response.data.chave;
	    		 var extensao = file.name.substr(file.name.lastIndexOf("."));
	    		 var arquivoS3 = chave + extensao;
	    		 file.arquivoS3 = arquivoS3;
	    		 
	    		 $scope.perfil.documentos.push(arquivoS3);
	    	 },
	    	 removedfile: function (file) {
	    		 // $log.info(file);
	    		 var indiceRemocao = $scope.perfil.documentos.indexOf(file.arquivoS3);
	    		 var removido = null;
	    		 if (indiceRemocao != -1)
	    			 removido =  $scope.perfil.documentos.splice(indiceRemocao, 1);
	    		 
	    		 $log.info(removido, $scope.perfil.documentos);
	    	 },
	     },
	     methods: {
	     }
	 };
	
	// Dados do perfil
	$scope.perfil = {
			numeroReceita: "",
			possuiManejo: false,
			fazProcessamento: false,
			certificacaoFSC: "",
			concessao: "",
			manejoComunitario: false,
			secagemEstufa: false,
			produtos: 0,
			produtosVendedor: 0,
			produtosComprador: 0,
			autex: [],
			documentos: [],
			especies: []
	};
	
	// Dados do participante
	$scope.participante = {
			nome: "",
			email: "",
			telefone: "",
			password1: "",
			password2: "",
			termos: false,
			nomeEmpresa: ""
	};

	// Verificar correspondência de senhas
	
	$scope.confirmacaoSenha = function(){
		var senha = $scope.participante.password1;
		var confirmacaoSenha = $scope.participante.password2;
		if (senha != confirmacaoSenha){
			$scope.senhasCorrespondem = "<i class='glyphicon glyphicon-remove text-danger'></i>" + translate('madeira.venda.perfil.senhasDiferentes');
		} else {
			$scope.senhasCorrespondem = "<i class='glyphicon glyphicon-ok text-success'></i> Ok";
		}
	}
	
	// Dados do país da empresa
	
	$scope.paises = [];
	
	dataService.getPaises().then(function (response) {
		$scope.paises = response.data.data;
	});
	
	
	// Dados da FSC
	$scope.fsc = {
			primeiraEmissao: "",
			ultimaEmissao: "",
			expiraEm: "",
			terminadaEm: "",
			suspensaEm: "",
			status: "",
			valida: null
	};
	
	// Carrega dados do perfil do vendedor
	if ($scope.isLogado) {
		dataService.getJson().then(
			function (res) {
				if (res.data.Result != "FAIL") {
					var perfil = res.data.data;
					$scope.participante = perfil.cadastro;
					$scope.participante.password1="";
					$scope.participante.password2="";
					$log.info(perfil);
					
					// Marca checkbox se houver dados preenchidos 
					$scope.temConcessao = (perfil.concessao != "" && perfil.concessao != undefined && perfil.concessao != null);
					
					$scope.perfil = angular.merge($scope.perfil, perfil);
					$scope.participante.nomeEmpresa = $scope.perfil.nomeEmpreendimento;
					$scope.verificaFSCC(perfil.certificacaoFSC);
				} else {
					error(res.data.message);
				}
			},
			function () {
				error("Não foi possível encontrar o seu perfil de venda.");
			}
		);
	}
	
	$scope.verificaFSCC = function(codigoFSC) {
		if ($scope.ultimaCertificacao == codigoFSC || codigoFSC == undefined)
			return;
		
		$scope.ultimaCertificacao = codigoFSC;
		$scope.verificandoFSCC = true;
		dataService.verificaFSCC(codigoFSC).then(
			function (res) {
				$scope.verificandoFSCC = false;
				
				$log.info(res);
				if (res.data.Result == "FAIL") {
					// error(res.data.message);
					$scope.fsc.valida = undefined;
					$scope.fsc.status = "";
				} else {
					var organizacao = res.data.data;
					$log.info(organizacao);
					
					// Registra dados da certificacao
					$scope.fsc.primeiraEmissao = organizacao.dataPrimeiraEmissao;
					$scope.fsc.ultimaEmissao = organizacao.dataUltimaEmissao;
					$scope.fsc.suspensaEm = organizacao.dataSuspensao;
					$scope.fsc.terminadaEm = organizacao.dataTermino;
					$scope.fsc.expiraEm = organizacao.dataExpiracao;
					$scope.fsc.status = organizacao.status;
					
					if (organizacao.status == "Valid")
						$scope.fsc.status = translate("madeira.venda.perfil.fsc.certificado.valido");
					
					$scope.fsc.valida = organizacao.status == "Valid";
					
					// Registra dados do participante
					$scope.participante.cep = organizacao.cep;
					$scope.participante.cidade = organizacao.cidade;
					$scope.participante.contatos = organizacao.contatos;
					$scope.participante.estado = organizacao.estado;
					$scope.participante.nomeOrg = organizacao.nome;
					
					if ($scope.participante.pais == undefined || $scope.participante.pais == null)
						$scope.participante.pais = organizacao.pais;
					
					$scope.participante.rua = organizacao.rua;
				}
			}, function () {
				error("Falha ao tentar verificar status da certificação FSC-C.");
			});
	};
	
	// Salva perfil do participante no banco
	$scope.save = function () {
		$scope.saving = true;
		if ($scope.perfil.numeroReceita == undefined)
			$scope.perfil.numeroReceita = "";
		
		dataService.post($scope.perfil, $scope.participante).then(
			function (res) {
				$scope.saving = false;
				$log.info(res);
				if (res.data.Result == "FAIL")
					error(res.data.message);
				else {
					success("Perfil salvo com sucesso");
					if (modalRegistroPrimeiroAcesso != null)
						modalRegistroPrimeiroAcesso.modal();
					
					setTimeout(function() {
						window.location = "/madeira/negocio/negocio/lista.do";
					}, 2500);
				}
			}, function () {
				$scope.saving = false;
				error("Falha ao tentar salvar perfil.");
			});
	};
	
	// Adiciona uma especie, se perfil ja tiver a especie, adiciona o volume
	$scope.addEspecie = function (nome, volume) {
		if (volume == undefined)
			volume = 0.0;
		
		// Converte volume de string para float
		var volumeFloat = volume;
		if (typeof a == "string" && volume.indexOf(",") != -1)
			volumeFloat = parseFloat(volume.replace(",", "."));
		
		// Busca indice de especie se já existe no perfil do usuário
		var i = 0;
		for ( i = 0; i < $scope.perfil.especies.length; i++) {
			var especie = $scope.perfil.especies[i];
			if (especie.nome == nome)
				break;
		}
		
		// Se especie ja existir, soma os volumes, caso contrario cria registro da especie no perfil com volume informado
		if (i < $scope.perfil.especies.length) {
			$scope.perfil.especies[i].volume += volumeFloat;
		} else {
			var especie = {
				nome: nome,
				volume: volumeFloat
			};
			$scope.perfil.especies.push(especie);
		}
		
		$scope.volumeVenda = "";
		$scope.especieVenda = $scope.filtraEspeciesSelecionadas()[0];
	};

	// Adiciona autex ao perfil e baixa as especies autorizadas da mesma, inserindo no objeto do perfil
	$scope.addAutex = function () {
		var estadoAutex = $scope.autex.estado;
		var numeroAutex = $scope.autex.numero;
		var anoAutex = $scope.autex.ano;
		var idAutex = $scope.autex.id;
			
		// Verifica preenchimento dos campos de acordo com o estado selecionado
		if (estadoAutex == "" || estadoAutex == undefined ||
				("PA, MT".indexOf(estadoAutex) != -1 && ((numeroAutex == "" || anoAutex == "") || (numeroAutex == undefined || anoAutex == undefined))) ||
				("PA, MT".indexOf(estadoAutex) == -1 && (idAutex == "" || idAutex == undefined)))
			return;
		
		var novaAutex = "";
		if ("PA, MT".indexOf(estadoAutex) != -1)
			novaAutex = estadoAutex + "-" + numeroAutex + "/" + anoAutex;
		else
			novaAutex = estadoAutex + "-" + idAutex;
		
		var self = this;
		
		if ($scope.perfil.autex.indexOf(novaAutex) < 0) {
			$scope.perfil.autex.push(novaAutex);
			
			// Consulta autex e retorna as especies informadas no documento encontrado
			dataService.getEspeciesAutex(novaAutex).then(
				function(res) {
					var especies = res.data.data;
					
					if (especies != undefined && especies.length > 0) {					
						for (i in especies) {
							var especie = especies[i];
							self.addEspecie(especie.especie, especie.volume);
						}
					} else {
						$scope.autexDesconhecida = true;
						info(translate("Não encontramos a autex informada no nosso sistema. Por favor preencha as especies disponiveis manualmente."));
					}
				}, function(data) {
					error(data);
				});
		}
		
		$scope.estadoAutex = "";
		$scope.numeroAutex = "";
		$scope.anoAutex = "";
	};

	// Remove especie da lista e redesenha div de especies
	$scope.removeEspecie = function (nomeEspecie) {
		jConfirm(translate("remocao.textoConfirmacao"), translate("remocao.titulo"), function (remove) {
			if (!remove) return;
			
			for (var i in $scope.perfil.especies) {
				var especie = $scope.perfil.especies[i];
				if (especie.nome == nomeEspecie)
					$scope.perfil.especies.splice(i, 1);
			}
			
			$scope.$apply();
		});
	};
	
	// Filtra array de especies em relacao as especies ja adicionadas no perfil
	$scope.filtraEspeciesSelecionadas = function() {
		$scope.listaEspecies.sort();
		return $scope.listaEspecies;
	};

	// Remove autex da lista e redesenha div de autex
	$scope.removeAutex = function (numeroAutex) {
		jConfirm(translate("remocao.textoConfirmacao"), translate("remocao.titulo"), function (remove) {
			if (!remove) return;
			
			for (var i in $scope.perfil.autex) {
				var autex = $scope.perfil.autex[i];
				
				if (autex == numeroAutex)
					$scope.perfil.autex.splice(i, 1);
			}
			
			$scope.$apply();
		});
	};
	
	// Verifica se produto esta selecionado
	$scope.checkProdutoSelecionado = function (lista, mascara) {
		if (lista == "comprador")
			return ($scope.perfil.produtosComprador & mascara) == mascara;
		if (lista == "vendedor")
			return ($scope.perfil.produtosVendedor & mascara) == mascara;
	};
	
	// Adiciona ou remove produto
	$scope.toggleProdutosSelecionados = function (lista, mascara) {
		
		if (lista == "comprador") {
			if ($scope.checkProdutoSelecionado(lista, mascara))
				$scope.perfil.produtosComprador -= mascara;
			else
				$scope.perfil.produtosComprador += mascara;
		}

		if (lista == "vendedor") {
			if ($scope.checkProdutoSelecionado(lista, mascara))
				$scope.perfil.produtosVendedor -= mascara;
			else
				$scope.perfil.produtosVendedor += mascara;
		}
	};
});