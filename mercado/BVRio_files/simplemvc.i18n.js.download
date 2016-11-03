/*
 * Modulo responsavel pela internacionalizacao no sistema
 */
var internationalization = function() {

	/*
	 * Mensagens no idioma selecionado
	 */
	var messages = {};

	/*
	 * Carrega o arquivo com as mensagens para traducao
	 */
	function prepareTranslation(url, locale, callback) {
		if (typeof url == "string") {
			loadTranslationFile(url, locale, callback);
		}
		else if (Object.prototype.toString.call(url) == "[object Array]") {
			prepareMultiFileTranslation(url, locale, callback);
		}
	}
	
	/*
	 * Prepara a traducao a partir de um conjunto de arquivos
	 */
	function prepareMultiFileTranslation(urlList, locale, callback) {
		var requests = [];
		
		$.each(urlList, function(key, url) {
			var aRequest = loadTranslationFile(url, locale, null); 
			requests.push(aRequest);
	    });

	    $.when.apply($, requests).done(function() {
	    	if (callback) callback();
	    });
	}
	
	/*
	 * Carrega um arquivo de traducao usando AJAX
	 */
	function loadTranslationFile(url, locale, callback) {
		return $.ajax({
			url: url, 
			beforeSend: function(xhr) {
				xhr.overrideMimeType('text/plain; charset=iso-8859-1');
			},
			success: function(result) {
				saveFile(result, locale);
				if (callback) callback();
		    }
		});
	}

	/*
	 * Processa o texto, capturando as mensagens de um determinado local
	 */
	function saveFile(text, locale) {
		// number to string
		text = '' + text;
		if (!text) return;
		
		// split text by newline
		var linesArray = text.split('\n');
		
		if (linesArray) {
			linesArray.forEach(function (line, index, array) {
				line = line.trim();
				
				if (line === '' || line.charAt(0) === '#')
					return;
				
				var keyValPair = line.match(/([^=]*)=(.*)$/);

				if (keyValPair && keyValPair[1]) {
					var key = keyValPair[1].trim();
					
					if (key.indexOf(locale + ".") == 0) {
						var value = keyValPair[2] ? keyValPair[2].trim() : '';
						key = key.substring(3);
						messages[key] = value;
					}
				}
			});
		}
	}

	/*
	 * Converte um texto unicode para string convencional
	 */
	function convertUnicodeString(str) {
		var convertedText = str.replace(/\\u[\dA-Fa-f]{4}/g, function (unicodeChar) {
			return String.fromCharCode(parseInt(unicodeChar.replace(/\\u/g, ''), 16));
		});
		return convertedText;
	}

	/*
	 * Traduz uma mensagem
	 */
	function translate(text) {
		var content = messages[text];
		
		if (content)
			return convertUnicodeString(messages[text]);
		
		return text;
	}
	
	return { prepareTranslation: prepareTranslation, translate: translate, messages: messages };
}();


/*
 * Funcao de carga do arquivo de internacionalizacao
 */
function prepareTranslation(url, locale, callback) {
	internationalization.prepareTranslation(url, locale, callback);
}


/*
 * Funcao de internacionalizacao de uma mensagem
 */
function translate(text) {
	return internationalization.translate(text);
}