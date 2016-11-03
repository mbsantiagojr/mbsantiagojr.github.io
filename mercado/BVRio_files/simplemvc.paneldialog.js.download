(function($) {

	$.fn.panelDialog2 = function(title) {
		return $(this).each(function() {
			if (!$(this).hasClass("modal")) {
				var childs = $(this).children();
				
				var janela = $(this)
					.addClass("modal fade");
				
				$(document).keyup(function(e) { 
				    if (e.keyCode == 27) 
				    	janela.modal('hide');
				});
				
				var janelaDialog = $("<div class='modal-dialog'>")
					.appendTo(janela);
				
				var janelaContent = $("<div class='modal-content'>")
					.appendTo(janelaDialog);
				
				if (title && title.length > 0) {
					var janelaHeader = $("<div class='modal-header'>")
						.appendTo(janelaContent);
					
					$("<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>")
						.html("&times")
						.appendTo(janelaHeader);
					
					$("<h5 class='modal-title'>")
						.css("margin-top", "0px")
						.css("margin-bottom", "0px")
						.appendTo(janelaHeader);
				}
				
				var janelaBody = $("<div class='modal-body'>")
					.appendTo(janelaContent);
				
				$(childs).appendTo(janelaBody);
				
				janela.on('shown.bs.modal', function (e) {
					janela.find("input[type!=hidden]").first().focus();
				});
			}

			if (title && title.length > 0) {
				$(this).find(".modal-title").text(title);
			}
			
		}).find(".modal-dialog");
	};
	
})(jQuery);