angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams) {

    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoID) {
        $http.get('v1/fotos/' + $routeParams.fotoID)
            .success(function (foto) {
                $scope.foto = foto;
            })
            .error(function (erro) {
                $scope.mensagem = 'Não foi possível obter a foto ID: ' + $routeParams.fotoID;
                console.log(erro);

            });
    }

    $scope.submeter = function () {

        if ($scope.formulario.$valid) {

            if ($scope.foto._id) {

                $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function () {
                        $scope.mensagem = 'Foto ' +  $scope.foto.titulo + ' alterada com sucesso.';
                        console.log(erro);
                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Não Foi Possível Alterar a Foto ' +  $scope.foto.titulo + '.';
                        console.log(erro);
                    })

            } else {
                $http.post('v1/fotos', $scope.foto)
                    .success(function () {
                        $scope.mensagem = 'Foto Incluída com Sucesso';
                        $scope.foto = {}
                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Não Foi Possível Incluir Mensagem.';
                        console.log(erro);
                    });

            };



        }



    }

});
