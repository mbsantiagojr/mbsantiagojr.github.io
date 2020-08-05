$(window).load(function () {

    $('body,html')
        .animate({
            scrollTop: 0
        }, 100);

    //console.clear();
    console.log('%cB2U Sistemas', 'display: block; color: #88B04B; font-size: 2em; font-family: "Trebuchet MS"');
    console.log('%cKeep it Simple!', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto"');
    console.log('%cA B2U Sistemas Ã© uma empresa que atua hÃ¡ 12 anos no mercado, fundada por profissionais com mais de 20 anos de experiÃªncia no segmento de vestuÃ¡rio, calÃ§ados, acessÃ³rios e presentes, desenvolvendo sistemas de informaÃ§Ã£o e consultoria.', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.1em; font-family: "Roboto"; line-height: 1.4');
    console.log('%c+55 [11] 3961-5531', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto"');


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
        var secao = $('section.' + this.name) ;
        
        console.log(this.name);

        achaPosicao(secao)

    });
    
    
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });

    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'right'
        });
      });

    
})($);