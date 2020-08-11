
(function () {
    "use strict";

    var materia = document.querySelectorAll('.altera-status-modal');
    
    $(materia).on('click', function (event) {

        event.preventDefault();
        
        $('body,html')
        .animate({
            scrollTop: 0
        }, 100);
        
        $("body").toggleClass('noscroll');
        $('.modal').toggleClass('mostra-modal');

    });
    
    
})($);

