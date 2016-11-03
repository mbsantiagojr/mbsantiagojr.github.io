function prepareSwitch(el) {
	return $(el).each(function(){
		var self = $(this);					

		var div = $("<div class='switch'>");
		self.after(div);
		
		div.on('click', function() {
			self.prop("checked", !self.prop("checked"));
			self.trigger("change");
		});
	});
}

function addYoutubeSwitch(placeholder, id, tituloRotulo) {
	var divPrincipal = $("<div class='checkbox-on-off'>")
		.appendTo(placeholder);
	
	if (tituloRotulo != undefined && tituloRotulo != null)
		$("<label for='" + id + "'>")
			.text(tituloRotulo)
			.appendTo(divPrincipal);
		
	var spControle = $("<span class='yt-uix-checkbox-on-off'>")
		.appendTo(divPrincipal);
	
	var chControle = $("<input id='" + id + "' type='checkbox'>")
		.appendTo(spControle);
	
	var lbRotulo = $("<label for='" + id + "' id='" + id + "-label'>")
		.appendTo(spControle);
	
	$("<span class='checked'>")
		.text(" ")
		.appendTo(lbRotulo);
		
	$("<span class='unchecked'>")
		.appendTo(lbRotulo);
	
	$("<span class='toggle'>")
		.text(" ")
		.appendTo(lbRotulo);
	
	return chControle;
}

function addAYSwitch(div, name, id, rotulo) {
	var value = $(div).attr("data-value");
	
	var chbox = addYoutubeSwitch(div, id, rotulo);
	$(chbox).attr("value", value).attr("name", name);
	
	return chbox;
}

function prepareYoutubeSwitch(el) {
	$(el).each(function () {
		var self = $(this);
		
		var divPrincipal = $("<div class='checkbox-on-off'>");
		self.before(divPrincipal);
			
		var spControle = $("<span class='yt-uix-checkbox-on-off'>")
			.appendTo(divPrincipal);
		
		var chControle = self.appendTo(spControle);
		
		var lbRotulo = $("<label for='' id=''>")
			.appendTo(spControle);
		
		$("<span class='checked'>")
			.text(" ")
			.appendTo(lbRotulo);
			
		$("<span class='unchecked'>")
			.appendTo(lbRotulo);
		
		$("<span class='toggle'>")
			.text(" ")
			.appendTo(lbRotulo);
		
		return chControle;
	});
}

$(document).ready(function() {
	prepareYoutubeSwitch($("input[type='checkbox'].ios-switch"));
});