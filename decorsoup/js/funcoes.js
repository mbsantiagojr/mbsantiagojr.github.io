//FUNCÃO PARA ANIMAR GRÁFICOS

(function() {
    "use strict";
    
    $(document).ready(function(){
        
        $('section.looks ul:nth-child(n+4)').addClass('painel-compacto');

        $('.mostrar-mais').click(function(event) {
            event.preventDefault();
            $('section.looks ul:nth-child(n+4)').removeClass('painel-compacto');

            console.log("Ok");
        });

        $('main section.looks ul li small a').on("click", function(event) {

            event.preventDefault();
            $(this).css('background-position','right -25px');                        
            console.log("Ok");

        });



        });
    
})();
