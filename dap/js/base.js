$(window).load(function () {

    $('body,html')
        .animate({
            scrollTop: 0
        }, 100);



});


$(window).scroll(function () {


    var body = document.body; // Safari
    var html = document.documentElement;

    posicao_html = html.scrollTop;
    posicao_body = body.scrollTop;

});



(function () {
    "use strict";

    function mudaPosicao(posicao) {

        $('body,html')
            .animate({
                scrollTop: posicao
            }, 400, function () {

            });
    }


    function localizaPosicao(secao) {

        var tamanhoCabecalho = 0;

        var posSecao = $(secao);
        var posTop = posSecao.offset();
        var posicaoTop = posTop.top - tamanhoCabecalho;

        var posicaoVetor = posicaoTop;

        return posicaoVetor;

    }


    function achaPosicao(nomeSecao) {

        var posicaoSecao = localizaPosicao(nomeSecao);
        mudaPosicao(posicaoSecao);

    }



    /*******************************************************/


    var setaTopo = document.querySelectorAll('.topo');
    $(setaTopo).on('click', function (event) {

        event.preventDefault();
        var secao = $('body[id*="index"');

        achaPosicao(secao)

    });

    var setas = document.querySelectorAll('.next');
    $(setas).on('click', function (event) {

        event.preventDefault();
        var secao = $(this).parents('section').next();

        achaPosicao(secao)

    });

    var setor = document.querySelectorAll('.nav li a');
    $(setor).on('click', function (event) {

        event.preventDefault();
        var secao = $('section.' + this.name);

        console.log(this.name);

        achaPosicao(secao)

    });




})($);
