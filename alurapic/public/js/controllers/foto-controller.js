angular.module('alurapic').controller('FotoController', function ($scope, $http) {

    $scope.foto = {};
    $scope.mensagem = '';
    $scope.submeter = function () {

        if ($scope.formulario.$valid) {

            $http.post('v1/fotos', $scope.foto)
                .success(function () {
                    $scope.mensagem = 'Foto Incluída com Sucesso';
                    $scope.foto = {}
                })
                .error(function (erro) {
                    $scope.mensagem = 'Não Foi Possível Incluir Mensagem.';
                    console.log(erro);
                })

        }



    }

});
