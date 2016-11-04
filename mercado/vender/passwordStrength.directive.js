angular.
	module('core').
	directive('passwordStrength',
        function($log) {
        	return {
        		require: 'ngModel',
        		restrict: 'A',
        		scope: {
        			password: "=ngModel"
        		},
        		
        		link: function (scope, elem, attrs, ctrl) {
        			
        			var drawStrength = function (strength) {
        				if (strength === null)
        					return elem.html("");
        				
        				var div = $("<div class='password-strength'>");
        				var icon = $("<i class='glyphicon'>");
        				var text = $("<span>");
        				
        				switch (strength) {
        					case 0:
        						icon.addClass("glyphicon-remove text-danger");
        						text.html(translate('madeira.venda.perfil.senhaFraca'));
        						break;
        					case 1:
        						icon.addClass("glyphicon-ok text-warning");
        						text.html("Ok");
        						break;
        					case 2:
        						icon.addClass("glyphicon-ok text-success");
        						text.html(translate('madeira.venda.perfil.senhaForte'));
        						break;
        				}
        				
    					div.append(icon).append(text);
    					
    					elem.html(div);
        			};
        			
        			scope.$watch('password', function(password) {
    					$log.info(password);
    					var strength = 0;
    					strength = isSatisfied(password.length >= 8 && password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) +
    		 			    isSatisfied(password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/));
    					
    					if (password.length > 0)
    						drawStrength(strength);
    					else
    						drawStrength(null);
    					
        	            function isSatisfied(criteria) {
        	              return criteria ? 1 : 0;
        	            }
        			});
        		}
        	};
        });