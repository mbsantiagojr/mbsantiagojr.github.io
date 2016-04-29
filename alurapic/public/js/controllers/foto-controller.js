angular.module('alurapic').controller('FotoController', function ($scope, $routeParams, recursoFoto ) {

    $scope.foto = {};
    $scope.mensagem = '';

//    var recursoFoto = $resource('v1/fotos/:fotoID', null, {
//        update: {
//            method: 'PUT'
//        }
//    });

    if ($routeParams.fotoID) {

        recursoFoto.get({
                fotoID: $routeParams.fotoID
            }, $scope.foto, function (foto) {
                $scope.foto = foto;

            },
            function (erro) {
                $scope.mensagem = 'Não foi possível obter a foto ID: ' + $routeParams.fotoID;
                console.log(erro);
            });


//        $http.get('v1/fotos/' + $routeParams.fotoID)
//            .success(function (foto) {
//                $scope.foto = foto;
//            })
//            .error(function (erro) {
//                $scope.mensagem = 'Não foi possível obter a foto ID: ' + $routeParams.fotoID;
//                console.log(erro);
//
//            });
    }

    $scope.submeter = function () {

        if ($scope.formulario.$valid) {

            if ($scope.foto._id) {

                recursoFoto.update({
                        fotoID: $scope.foto.id
                    }, $scope.foto, function (foto) {
                        $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' alterada com sucesso.';
                        console.log(erro);
                    },
                    function (erro) {
                        $scope.mensagem = 'Não Foi Possível Alterar a Foto ' + $scope.foto.titulo + '.';
                        console.log(erro);
                    });

//                $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
//                    .success(function () {
//                        $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' alterada com sucesso.';
//                        console.log(erro);
//                    })
//                    .error(function (erro) {
//                        $scope.mensagem = 'Não Foi Possível Alterar a Foto ' + $scope.foto.titulo + '.';
//                        console.log(erro);
//                    })

            } else {
                
                recursoFoto.save($scope.foto, function() {
                        $scope.mensagem = 'Foto Incluída com Sucesso';
                        $scope.foto = {}
                },
                                
                function(erro) {
                        $scope.mensagem = 'Não Foi Possível Incluir Mensagem.';
                        console.log(erro);
                });
                
//                $http.post('v1/fotos', $scope.foto)
//                    .success(function () {
//                        $scope.mensagem = 'Foto Incluída com Sucesso';
//                        $scope.foto = {}
//                    })
//                    .error(function (erro) {
//                        $scope.mensagem = 'Não Foi Possível Incluir Mensagem.';
//                        console.log(erro);
//                    });

            };



        }



    }

});
