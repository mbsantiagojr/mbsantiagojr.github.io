//FUNCÃO QUE TRATA AS SETAS E POSICIONA A LANDING PAGE

(function() {
    "use strict";
    
    var secoes = ["home", "pessoal", "profissional", "portifolio", "contato"];
    
    var setas = document.querySelectorAll(".ff");
    var botoes = document.querySelectorAll("nav ul li a");

    var cadaSeta = [].slice.call(setas);
    var cadaBotao = [].slice.call(botoes);
    
  
    var slider = $('.bxslider').bxSlider({
        pager: false,
        slideMargin: 0, 
		onSliderLoad: function() {
                $('.jim-carrey').css("visibility", "hidden");
                $('.jim-carrey').css("height", "0");
                $('.jim-carrey').css("overflow", "hidden");
            }
    });
	
	
    
    
    $("#botaohome").on("click", function(event) {
        event.preventDefault();
        $('body,html').animate( {scrollTop:0},2000) ;  

    });
    
    
    var trabalhos = document.querySelectorAll(".jobs li a");
    var cadaTrabalho = [].slice.call(trabalhos);   
    

    
    cadaTrabalho.forEach(function(el) {
        
        el.addEventListener("click", function(event) {
            
            event.preventDefault();
            var posPortifolio = $('.portifolio');
            var posTop = posPortifolio.offset();
            var posicaoVetor = posTop.top + 140; 
            
            $('body,html').animate( {scrollTop:posicaoVetor},1000) ;  
            
            var numVetor = cadaTrabalho.indexOf(this);
            slider.goToSlide(numVetor);
            
            console.log(numVetor);

            
                $('.jim-carrey').css("visibility", "visible");
                $('.jim-carrey').css("height", "auto");
                $('.jim-carrey').css("padding", "40px 0 35px 0");
                $('.jim-carrey').css("overflow", "show");

            return false;

        });
        
    });
    
    
    cadaBotao.forEach(function (el) {
        
        el.addEventListener("click", function(event) {
            
            event.preventDefault();
            var botaoID = this.innerHTML;
            
            var posPortifolio = $('.' + botaoID);
            var posTop = posPortifolio.offset();
            var posicaoVetor = posTop.top; 
            
            console.log(botaoID + posicaoVetor);            
            
            $('body,html').animate( {scrollTop:posicaoVetor},1000) ;     
                $('.jim-carrey').css("visibility", "hidden");
                $('.jim-carrey').css("height", "0");
                $('.jim-carrey').css("overflow", "hidden");

            return false;

            
        });
        
    });
    
    
    cadaSeta.forEach(function (el) {
        
        el.addEventListener("mouseover", function() {
            this.classList.toggle("bounce");
        });
        
        el.addEventListener("click", function(event) {
            event.preventDefault();
            var setaPosicao = this.offsetTop;
            var setaID = this.id;
            var posPortifolio = $('.' + setaID);
            var posTop = posPortifolio.offset();
            var posicaoVetor = posTop.top; 
            
            $('body,html').animate( {scrollTop:posicaoVetor},1000) ;   
                $('.jim-carrey').css("visibility", "hidden");
                $('.jim-carrey').css("height", "0");
                $('.jim-carrey').css("overflow", "hidden");
            return false;

        });

        
    });
    
    

})();




//FUNCÃO QUE TRATA O PARALLAX

(function() {
    "use strict";
    
$(document).ready(function(){
  
        $('.fundo-parallax').each(function(){

            var $camada = $(this);

            $(window).scroll(function() {
                
                var posicaoJanela = $(window).scrollTop();
                
                var yPos = -($(window).scrollTop() 
                            / $camada.data('speed')); 
                var yOutros = (yPos / 2)
                var bgpos = '0 '+ yPos + 'px';
                var bgOutros = -yOutros*10;
                
                $camada.css('background-size', 'cover' );   
                $camada.css('background-position', bgpos );   
                $(".move-devagar").css('margin-top', bgOutros );
                
               if (posicaoJanela > 185) {
                   
                    $("header").addClass("muda-header");
               }
                else {
                     $("header").removeClass("muda-header");  
                }
                //console.log(posicaoJanela);
               
            }); 
        });	
       
    });
    
})();



//FUNCÃO PARA ANIMAR GRÁFICOS

(function() {
    "use strict";
    
$(document).ready(function(){
      
    $(window).scroll(function() {
        
        var posicaoDaJanela = $(window).scrollTop();
        
        
        var posObjeto = $('.profissional');
        var posTop = posObjeto.offset();
        var posicaoVetor = posTop.top; 
        
       if (posicaoDaJanela >= posicaoVetor) {

            $(".grafico").removeClass("grafico-fechado");
       }
        else {
             $(".grafico").addClass("grafico-fechado");  
        } 
        
        console.log("J- " + posicaoDaJanela);
        console.log("V- " + posicaoVetor);        
       
        });
    


    });
    
})();


