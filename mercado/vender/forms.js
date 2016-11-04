function externalAjaxCall(url, postData, async, success) {
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: postData,
		async: async,
		success: function (data) {
			if (success) success(data);
		},
		error: function () {
			hideProcessingSign();
		}
	});
}

function ajaxCall(url, postData, async, successFnc) {
	ajaxCallWithError(url, postData, async, successFnc, function(data) {
		error(data.message);
	});
}

function ajaxCallWithError(url, postData, async, successFnc, errorFnc) {
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		data: postData,
		async: async,
		success: function (data) {
			if (data.Result == "OK") {
				if (successFnc) successFnc(data.data);
			}
			else {
				hideProcessingSign();
				errorFnc(data);
			}
		},
		error: function () {
			hideProcessingSign();
			errorFnc({message: "Erro de conex\u00E3o com o servidor."});
		}
	});
}

function preencheEstados(controleEstado, selecionado, callback) 
{
	ajaxCall("/common/listaEstados.do", "", true, function(data) {
		s = "<option value=''>Selecione um estado ...</option>";
		$(data).each(function() { s = s + "<option value=\"" + this.sigla + "\">" + this.nome + "</option>"; });
		controleEstado.html(s).val(selecionado);
		
		if (callback && typeof callback == "function")
			callback();
	});
}

function capturaMunicipios(controleEstado, controleMunicipio, selecionado) 
{
	ajaxCall("/common/listaMunicipios.do", "estado=" + $("#" + controleEstado).val(), true, function(data) {
		s = "";			
		$(data).each(function() { s = s + "<option value=\"" + this + "\">" + this + "</option>"; });
		$('#' + controleMunicipio).html(s);
		$('#' + controleMunicipio).val(selecionado);
		$('#' + controleMunicipio).trigger('change');
	});
}

function capturaMunicipios2(controleEstado, controleMunicipio, selecionado) 
{
	capturaMunicipios2(controleEstado, controleMunicipio, selecionado, true);
}

function capturaMunicipios2(controleEstado, controleMunicipio, selecionado, async) 
{
	ajaxCall("/common/listaMunicipios.do", "estado=" + $("#" + controleEstado).val(), async, function(data) {
		var s = "<option value=''>Selecione um munic\u00edpio ...</option>";			
		$(data).each(function() { s = s + "<option value=\"" + this + "\">" + this + "</option>"; });
		$('#' + controleMunicipio).html(s);
		$('#' + controleMunicipio).val(selecionado);
		$('#' + controleMunicipio).trigger('change');
	});
}

function addNavigation(name, url) {
	var s = $("#navigationbar").html();
	
	if (s.length == 0)
		s += "<a href=\"/login/homepage.do\">Home</a>";
	
	s += " &raquo; <a href=\"" + url + "\">" + name + "</a>";
	$("#navigationbar").html(s);
}

var notificationTimer = undefined;

function notice(message, title) {
	title = title || "";
	
	var options = {
		fixed: true,
		title: title
	};
	
	if (typeof(message) == "string")
		options.message = message;
	else {
		$.extend(options, message);
	}
	
	var warnings = $.growl.warning(options);
	return warnings;
}

function error(message, title) {
	title = title || "";
	$.growl.error({message: message, fixed: true, title: title});
}

function success(message, title) {
	title = title || "";
	$.growl.notice({message: message, fixed: true, title: title});
}

function info(message, title) {
	title = title || "";
	$.growl({message: message, fixed: true, title: title});
}

function fieldError(s, field) {
	error(s);

	var backColor = field.css("background-color");
	field.css("background-color", "rgb(219, 186, 186)");
	field.css("border-color", "red");
	
	setTimeout(function() {
		field.animate({backgroundColor: backColor, borderColor: ""}, 1000, function() {
			field.css("border-color", "");
		});
	}, 3000);
}

function check(element, status) {
	element.attr("checked", status);	
	element.prop("checked", status);
}

function isChecked(element) {
	return element.is(":visible") && element.is(":checked");
}

function help(helpfield) {
	var link = $("#" + helpfield);

	link.click(function() {
		var janela = $("#div_" + helpfield);
		var title = janela.attr("title") || "Ajuda";
		janela.show();
		janela.panelDialog2(title);
		janela.modal("show");
		return false;
	});
}

function pageReload() {
	location.reload();
}

function setLinkCursor() {
	$(this).css("cursor", "link");
}

function setPointerCursor() {
	$(this).css("cursor", "pointer");
}

function blockFormResubmission(el) {
	el.submit(function() {
	    $(this).submit(function() {
	        return false;
	    });
	    return true;
	});
}

function apresenta(control, flag) {
	if (flag)
		control.show();
	else
		control.hide();
}

function enable(control, flag) {
	if (flag)
		control.removeAttr('disabled');
	else
		control.attr('disabled', 'disabled');
}

function hasOptionSelected(combo) {
	var option = combo.find("option:selected");
	return option && (option.length > 0);
}

function selectedOptionText(combo) {
	var option = combo.find("option:selected");
	return option ? option.text() : "";
}

function refreshPage(event) {
	window.location = event.data.link;
}

function nop() {
	// No operation
}

function getRequestParameter(name) {
	var rx = new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)');
	var result = rx.exec(location.search);
	
	if (result)
		return decodeURIComponent(result[1]);
	
	return "";
}

function hasRequestParameter(name){
	var rx = new RegExp('[?&]' + encodeURIComponent(name) + '[^=&]*');
	var result = rx.exec(location.search);
	return result ? true : false;
}

function criaLinksTopo() {
	var botoesNavegacao = function () {
		var divs = $("<div>").attr("class", "links pull-right");
		
		var textoTopo = $("a[data-id='topo']").html();
		var botaoTopo = $("<a>").attr("class", "").attr("href", "#header").html(textoTopo);
		botaoTopo.appendTo(divs);
		
		return divs;
	};
	
	for(var i = 0; i < $("p.header").length; i++) {
		var header = $("p.header")[i];
		if (header.offsetTop >= window.innerHeight) {
			$(header).append(botoesNavegacao());
		}
	}
}