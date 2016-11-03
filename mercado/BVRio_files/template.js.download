/*
 * Painel usado pelo template das p�ginas do sistema
 */
TemplatePanel = function() {

	/*
	 * Prepara o template
	 */
    function init(){
    	preparaCartoes();
		preparaComandosLocais();
        apresentaContadorCAR();

		$("#bv-main-container").append($("#content").children());

		$("footer").removeClass("hidden");
        $(window).on('resize', atualizaPosicaoRodape);
        atualizaPosicaoRodape();
		
		$(document).ajaxSuccess(function(event, xhr, settings) {
			$(window).trigger("resize");
		});
		
		$("#login_email").focus();	
		$(".notice").delay(10000).slideUp("slow");
		
		for (var erro in erros) {
			erro = erros[erro];
			error(erro);
		}
        
		ajaxCall("/plataforma/plataforma/resumosNegociacaoPublico.do", "", true, apresentaMarquee);
    }

    /*
     * Prepara os cartoes usados na p�gina
     */
    function preparaCartoes() {
        var isIE = (navigator.userAgent.indexOf("MSIE") != -1) || (navigator.userAgent.indexOf("Trident") != -1);

        if(!isIE){
            $('.card .back').css('display','block');
        }
        
        $('.card .hit_card').click(function(){
            $(this).parent().parent().toggleClass('flip');
            if(isIE){
                $(this).parent().parent().toggleClass('flip_duro');
            }
        });
        
        $('.card .hit_card').hover(function(){
            $(this).parent().find('.circulo').toggleClass('anima');
        });
        
        $( ".card .back p" ).each(function() {
            var txt = $(this).text();
            if(txt.length > 198){
                $(this).text($(this).text().substring(0,198) + '...');
            }
        });
    }
    
    /*
     * Move os comandos locais para o topo da tela
     */
    function preparaComandosLocais() {
		$("span.localCommand").each(function() {
			var link = $(this).find("a").addClass("caos");
			/*var lastCommand = $("#globalpreload").parent();
			$("<li>").append(link).insertBefore(lastCommand);*/
			var lastCommand = $("#localMenu");
			$("<li>").append(link).appendTo(lastCommand);
		});
		
		$("span.localCommand").remove();
    }

    /*
     * Apresenta o timer para a data limite de registro no CAR
     */
    function apresentaContadorCAR() {
        var dt = $('#date-counter').attr('end-date');
        var end = new Date(dt);
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer = null;

        function showRemaining() {
            var now = new Date();
            var distance = end - now;

            if (distance < 0) {
                clearInterval(timer);
                $("#date-counter").html('EXPIRADO!');
                return;
            }
            
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);

            if(days.toString().length == 1){days = '0'+days;}
            if(hours.toString().length == 1){hours = '0'+hours;}
            if(minutes.toString().length == 1){minutes = '0'+minutes;}
            if(seconds.toString().length == 1){seconds = '0'+seconds;}

            var counter = days + ' dias e ' + hours + ':' + minutes + ':' + seconds + '';
            $("#date-counter").html(counter);
            
            $('#news-container .news-content').fadeTo(150, 1);
        }

        timer = setInterval(showRemaining, 1000);
    }

    /*
     * Atualiza a posi��o do rodap� da janela
     */
    function atualizaPosicaoRodape() {
        var $el_footer = $('footer');
        $el_footer.css({'position':'relative'});
        
        var footer_pos = $el_footer.offset().top;
        var footer_height = $el_footer.height();
        var win_height = $(window).innerHeight();

        if(win_height > ((footer_height*2) + footer_pos) && win_height > footer_pos){
            $el_footer.css({'position':'fixed', 'bottom':'0px'});
        }
    }
    
	/*
	 * Apresenta o marquee de pre�os dos ativos
	 */
	function apresentaMarquee(data) {
		var numeroAtivos = data.length;
		var textoMarquee = "";
		
		for (var i = 0; i < numeroAtivos; i++) {
			var entrada = data[i];
			
			if (entrada.ask != "-") {
				textoMarquee += "<span class='entrada'><span class='ticker'>" + entrada.ticker + "</span>: V <span class='venda'>" + entrada.ask + "</span>";	  
				
				if (entrada.bid != "-")
					textoMarquee += " C <span class='compra'>" + entrada.bid + "</span>";
				
				textoMarquee += "</span>";
			}
		}
		
		var marquee = $("marquee");
		marquee.html(textoMarquee);
		
		if (textoMarquee.length > 0)
			marquee.parent().show();
		else
			marquee.parent().hide();
	}

	/*
	 * Apresenta um tutorial, dado seu c�digo
	 */
	function apresentaTutorial(code) {
		var divBase = $("#dlgTutorial");
		
		if (divBase.length == 0) {
			divBase = $("<div id='dlgTutorial'>")
				.appendTo($("body"));
			
			$("<iframe width='560' height='315' src='//www.youtube.com/embed/" + code + "?enablejsapi=1' frameborder='0' allowfullscreen>")
				.appendTo(divBase);
			
			divBase.panelDialog2("Tutorial");
			
			divBase.on('hidden.bs.modal', function() { 
				$("iframe")[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
			});
		}
		
		divBase.modal('show');
		
		setTimeout(function() {
			$("iframe")[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		}, 1000);
	}

	return { init: init, apresentaTutorial: apresentaTutorial, atualizaPosicaoRodape: atualizaPosicaoRodape }
};