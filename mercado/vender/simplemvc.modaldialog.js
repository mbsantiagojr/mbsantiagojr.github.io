(function($) {

	/*
	 * Executes the window's command
	 */
	function modalDialog2_executeCommand(window, form, action, errorDiv, waitDiv, options) {
		var e = {
			data: {
				window: window,
				errorDiv: errorDiv,
				options: options
			}
		};
		
    	if (action)
    	{
    		waitDiv.show();
        	var postData = form ? form.serialize() : "";
        	
        	ajaxCallWithError(action, postData, true, function (data) {
    			errorDiv.hide();
    			waitDiv.hide();
    			modalDialog2_destroyModal(e);
    		    
    			if (options.afterCommandFunction) 
    				options.afterCommandFunction(data);

        	}, function(data) {
    			errorDiv.html(data.message).show();
    			waitDiv.hide();
        	});
    	}
    	else if (options.submitFunction)
		{
    		waitDiv.show();
        	
    		try 
    		{
    			var data = options.submitFunction();
    			errorDiv.hide();
    			waitDiv.hide();
    			modalDialog2_destroyModal(e);
    			
    			if (options.afterCommandFunction) 
    				options.afterCommandFunction(data);
    		}
    		catch(err) 
    		{
    			errorDiv.html(err).show();
    			waitDiv.hide();
    		}
		}
    	else
		{
    		errorDiv.hide();
    		modalDialog2_destroyModal(e);
		    
    		if (options.afterCommandFunction) 
    			options.afterCommandFunction();
		}
	}
	
	/*
	 * Handles clicks in the OK button
	 */
	function modalDialog2_handleOK (e) {
		var window = e.data.window;
		var form = e.data.form;
		var errorDiv = e.data.errorDiv;
		var waitDiv = e.data.waitDiv;
		var options = e.data.options;
		
		var action = form ? form.attr("action") : "";

		errorDiv.hide();
		var message = form ? form.attr("confirm") : "";

		if (options.confirmationMessageFunction)
    		message = options.confirmationMessageFunction();
    	
    	if (options.confirmationMessage)
    		message = options.confirmationMessage;
		
    	if (message)
    	{
			jConfirm(message, 'Confirma\u00E7\u00E3o', function(result) {
				if (result)
					modalDialog2_executeCommand(window, form, action, errorDiv, waitDiv, options);
			});
    	}
    	else
    		modalDialog2_executeCommand(window, form, action, errorDiv, waitDiv, options);
	}
	
	/*
	 * Handles clicks in the CANCEL button
	 */
	function modalDialog2_handleCancel (e) {
		var errorDiv = e.data.errorDiv;

		errorDiv.hide();
		modalDialog2_destroyModal(e);
	}
	
	/*
	 * Destroys modal
	 */
	function modalDialog2_destroyModal(e) {
		var window = e.data.window;
		var options = e.data.options;
		
		if (options && options.onDestroy) {
			options.onDestroy();
		}
		window.modal('hide');
	}
	
	/*
	 * Handles the ESCAPE key
	 */
	function modalDialog2_handleEscapeKey(e) { 
		if (e.keyCode == 27) 
	    	modalDialog2_destroyModal(e);
	}
	
	/*
	 * Handles keys on form inputs
	 */
	function modalDialog2_handleKeys(e) {
		//var window = e.data.window;
		var button = e.data.button;
		
		if (e.which == 27)
		{
			modalDialog2_destroyModal(e);
			e.preventDefault();
		}
		else if (e.which == 13)
		{
			button.click();
			e.preventDefault();
		}
	}
	
	/*
	 * Main extension point for window
	 */
	$.fn.modalDialog2 = function(opt) {

		return $(this).each(function() {

			var defaultOptions = {
				afterCommandFunction: null,
				confirmationMessageFunction: null,
				confirmationMessage: null
			};
			
			var options = $.extend({}, defaultOptions, opt);
			
			var title = $(this).attr("title");
			
			if (title == undefined) {
				title = $("div[data-role='title']", this).hide().html();
			}
			
			if (title)
				options.title = title;

			var childs = $(this).children();
			
			var janela = $(this)
				.addClass("modal fade");
			
			var janelaDialog = $("<div class='modal-dialog'>")
				.appendTo(janela);
			
			if (options.top)
				janelaDialog.css("top", options.top);
			
			var janelaContent = $("<div class='modal-content'>")
				.appendTo(janelaDialog);
			
			var janelaHeader = $("<div class='modal-header'>")
				.appendTo(janelaContent);
			
			$("<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>")
				.html("&times")
				.appendTo(janelaHeader);
			
			$("<h5 class='modal-title'>")
				.css("margin-top", "0px")
				.css("margin-bottom", "0px")
				.html(options.title)
				.appendTo(janelaHeader);
			
			var janelaBody = $("<div class='modal-body'>")
				.appendTo(janelaContent);
			
			var janelaFooter = $("<div class='modal-footer'>")
				.appendTo(janelaContent);
			
			var waitDiv = $("<div class='ui-dialog-waitsign'>")
				.css("float", "left")
				.css("display", "none")
				.appendTo(janelaFooter);
			
			$("<img src='/img/preload.gif'/>") 
				.appendTo(waitDiv);

			var btOK = $("<button type='button' class='btn btn-default'>")
	        	.css("width", "80px")
	        	.text((options.ok) ? options.ok : "OK")
	        	.appendTo(janelaFooter);
	        
	        var btCancela = $("<button type='button' class='btn btn-default' data-dismiss='modal'>")
	        	.css("width", "80px")
	        	.text((options.cancel) ? options.cancel : "Cancela")
	        	.appendTo(janelaFooter);
	
	        var errorDiv = $("<div class='errorMessage'>")
				.css("display", "none")
				.appendTo(janelaBody);
	
			var forms = $(this).find("form");
			var form = null;
			
			$.each(forms, function(formIndex, currentForm) {
				if (!$(currentForm).hasClass("dialog-ignore"))
					form = $(currentForm);
			});
	        
	        btOK.on('click', {window: janela, form: form, errorDiv: errorDiv, waitDiv: waitDiv, options: options}, modalDialog2_handleOK);
	        btCancela.on('click', {window: janela, errorDiv: errorDiv, options: options}, modalDialog2_handleCancel);
	        
			$(document).on('keyup', {window: janela, options: options }, modalDialog2_handleEscapeKey);
			
			var campos = janela.find("input");
			var lenCampos = campos.length;
			
			for (var i = 0; i < lenCampos; i++) {
				var campo = $(campos[i]);
				
				if (!campo.hasClass("disableEnter"))
					campo.on('keydown', {window: janela, button: btOK, options: options }, modalDialog2_handleKeys);
			}

			$(childs).appendTo(janelaBody);
			
			janela.on('shown.bs.modal', function (e) {
				janela.find("input[type!=hidden], select, textarea").first().focus();
			});
		});
	}
	
	/*
	 * Show an error in a modal dialog
	 */
	$.fn.modalDialogShowError = function(message) {
		$(this).find("div.errorMessage")
			.text(message)
			.show();
	};
	
	/*
	 * Hide the error message in a modal dialog
	 */
	$.fn.modalDialogHideError = function(message) {
		$(this).find("div.errorMessage")
			.hide();
	};
	
})(jQuery);