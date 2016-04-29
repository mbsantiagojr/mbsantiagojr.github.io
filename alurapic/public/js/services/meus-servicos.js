angular.module('meusServicos', ['ngResource']).factory('recursoFoto', function ($resource) {

    return $resource('v1/fotos/:fotoID', null, {
        update: {
            method: 'PUT'
        }
    });

});
