$(window).load(function () {

    $('body,html')
        .animate({
            scrollTop: 0
        }, 100);

    //console.clear();
    console.log('%cNightPass', 'display: block; color: #88B04B; font-size: 2em; font-family: "Trebuchet MS"');
    console.log('%cApp', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto"');
    console.log('%cLorem Ipsum', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.1em; font-family: "Roboto"; line-height: 1.4');
    console.log('%c+55 [11] 9999-9999', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto"');

    $(document).ready(function () {
        $('.sidenav').sidenav();
    });

    setTimeout(function () {
        $('.loader').hide();
        $('.abertura').css('height', '100%');

    }, 6000);




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
        var secao = $(".home");

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


    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });


    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'right'
        });
    });


})($);
