$(window).load(function () {
    //console.log("Leu!");
    
    $('body,html')
    .animate({
        scrollTop: 0
    }, 100);
    
    console.log('%cMB Santiago jnr', 'display: block; color: #f3b132; font-size: 2em; font-family: "Trebuchet MS"');
    console.log('%cHTML, CSS, JS, Flash Y Otras Cositas Más...', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto", Verdana');
    console.log('%cDesigner por Profissão. Front-End Entusiasta. Ciclista Amador. Fotógrafo de celular. Blogueiro quando entediado. Foodie. Internacionalista.', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.1em; font-family: "Roboto", Verdana; line-height: 1.4');
    console.log('%c+55 (11) 9 7972-7575 | mbsantiagojr@outlook.com', 'display: inline-block; font-weight: normal; color: #aaa; font-size: 1.75em; font-family: "Roboto", Verdana');
    
});

//FUNCÃO QUE TRATA AS SETAS E POSICIONA A LANDING PAGE

(function () {
    "use strict";
    
    
    function mudaPosicao(posicao) {
        
        $('body,html').animate( {scrollTop:posicao},400);
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
    
    
    
    var setas = document.querySelectorAll('.ff');
    $(setas).on('click', function(event) {
        
        event.preventDefault();        
        var secao = $(this).parents('section').next();        
        achaPosicao(secao);

    });   

    
    /*******************************************************/
    
    
    
    var animacoes = $('main > section');
    var cadaAnimacao = [].slice.call(animacoes);
    
    var tmOut;
    

    $(window).scroll(function () {

        var posicaoJanela = $(window).scrollTop();
        var alturaJanela = $(window).height();
        var larguraJanela = $(window).width();
        
        cadaAnimacao.forEach(function (el) {
        
            if (localizaPosicao('.habilidades') - (alturaJanela/2.5) >= posicaoJanela) {
                $('.habilidades .grafico').addClass('fechado');
            }
            else {
                $('.habilidades .grafico').removeClass('fechado');  
            }
            
            if (posicaoJanela > 400) {
                $("header").addClass("mudacabecalho");
           }
            else {
                 $("header").removeClass("mudacabecalho");  
            }
            
        }); 
        

    });


    /*******************************************************/
    
    
    var navPaginas = document.querySelectorAll('header nav a, a#topo');
    
    $(navPaginas).on('click', function(event) {
        event.preventDefault(); 
        var nomeBotao = this.attributes["name"].value;
        var qualPagina = $('section[name*="' + nomeBotao + '"]');
        achaPosicao(qualPagina);
    });
    
    
    /********************** CARROSSEL ***********************/
    
    
    var pecas = document.querySelectorAll('section.portifolio > ul li a');
    var $carousel = $('.carousel');
    
    $(pecas).on( 'click', function(event) {
        event.preventDefault();
        mudaPosicao(localizaPosicao('section.portifolio'));
        var index = $(this).index('section.portifolio > ul li a');
        $carousel.addClass('aberto');
        $carousel.flickity( 'select', index);
    });


    

})($);

