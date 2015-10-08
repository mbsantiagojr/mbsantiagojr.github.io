//FUNCÃO QUE TRATA AS SETAS E POSICIONA A LANDING PAGE

(function() {
	"use strict";
	
	var secoes = document.querySelectorAll("header section nav ul li a");
    var cadaSecao = [].slice.call(secoes); 
	
	$(document).ready(function() {
	
		$("#botaohome").on("click", function(event) {
			event.preventDefault();
			$('body,html').animate( {scrollTop:0},2000) ;  

		});

		cadaSecao.forEach(function(el) {

			el.addEventListener("click", function(event) {

				event.preventDefault();
				var posSecao = $('section[name="' + el.text + '"]');
				var posTop = posSecao.offset();
				var posicaoVetor = posTop.top - 70; 	
				
				console.log(posTop.top);
				console.log(el.text);
				
				$('body,html').animate( {scrollTop:posicaoVetor},750) ;  


			});

		});		
		
		
	});
	

			
})($);



(function() {
	"use strict";
	
	var tamanhoCabecalho = 60; 
	var tamanhoRodape = 0;
	
	
		$(document).ready(function() {

		$.getJSON("secoes-a-ajustar.json")

			.done(function(ajustar) { 
			
				console.log("Leu JSON.");			
						
				$(window).on("resize", function(){

					var larguraJanela = $(window).width();
					var alturaJanela = $(window).height();	
                    
                    console.log(larguraJanela);
                    console.log(alturaJanela);


					if (larguraJanela >= 768) {

						ajustar["semHeader"].forEach(function(el) {
							
                            tamanhoCabecalho = 0;
							$(el).css("height", alturaJanela - tamanhoCabecalho - tamanhoRodape);


						});	

						ajustar["comHeader"].forEach(function(el) {	
							
							tamanhoCabecalho = $("header").height();							
							$(el).css("height", alturaJanela - tamanhoCabecalho - tamanhoRodape);


						});	

						ajustar["comRodape"].forEach(function(el) {	
							
							tamanhoCabecalho = $("header").height();							
							tamanhoRodape = $("footer").height();							
							$(el).css("height", alturaJanela - tamanhoCabecalho - tamanhoRodape);


						});	
                        
                        $(window).scroll(function() {

                            var posicaoJanela = $(window).scrollTop();

                           if (posicaoJanela > alturaJanela/2) {
                               
                               console.log("Vai Mudar!");

                                $("header").addClass("muda-header");
                           }
                            else {
                                 $("header").removeClass("muda-header");  
                            }
                            //console.log(posicaoJanela);

                        }); 
                        
                        
                        
                        

					}

				}).resize();

			})
	
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Não leu JSON. Request Failed: " + err );
            });

	});
	
	

})($);




(function() {
	"use strict";
	
	var secoes = document.querySelectorAll("header section nav ul li ul li a");
    var cadaSecao = [].slice.call(secoes); 
	
	$(document).ready(function() {
	
		$("#botaohome").on("click", function(event) {
			event.preventDefault();
			$('body,html').animate( {scrollTop:0},1000) ;  

		});

		cadaSecao.forEach(function(el) {

			el.addEventListener("click", function(event) {

				event.preventDefault();
				var posSecao = $('section[name="' + el.text + '"]');
				var posTop = posSecao.offset();
				var posicaoVetor = posTop.top - 60; 	
				
				console.log(posTop.top);
				console.log(el.text);
				

				$('body,html').animate( {scrollTop:posicaoVetor},350) ;  


			});

		});		
		
		
	});
	

			
})($);