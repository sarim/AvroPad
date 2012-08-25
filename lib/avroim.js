var avroim = {
    supportIntellisense: true,
    intellisense: function(currentinput, lastcarry,evnt){
		returndict = {};
        //console.log(JSON.stringify(currentinput) + " <- current | carry -> " + JSON.stringify(lastcarry));
		carry = lastcarry + currentinput;
		//replacement = currentinput;
		
		returndict.type = 1;
		
		
		replacement = '';
		//console.log(JSON.stringify(carry));
		sgl = suggestionBuilder.suggest(lastcarry);
		returndict.lastInsertedString = sgl.words[sgl.prevSelection];
		
		
		//console.log(replacement);
		var tip = $('#tip');

		if (currentinput == " " || currentinput == "\r") {
			suggestlist = suggestionBuilder.suggest(carry.trim());
			
			replacement = suggestlist.words[suggestlist.prevSelection];
			replacement += currentinput;
			carry = "";
			tip.hide();
			console.log("hidden");
		}
		else if (currentinput == "" && lastcarry == "") {
			tip.hide();
		}
		else{
			suggestlist = suggestionBuilder.suggest(carry);
			replacement = suggestlist.words[suggestlist.prevSelection];
			var pos = $(evnt.target).getCaretPosition();
			tip.empty();
			suggestlist.words.unshift(carry);
			suggestlist.words.forEach(function(strr){
				$('<span/>', {
				    text: strr,
					click : function(ev){
						tip.hide();
						$("#entext").trigger("cmttxt",[$(this).text(),carry]);
						suggestionBuilder.stringCommitted(carry,$(this).text());
						return false;  
					},
					mouseup : function(ev){
						$("#entext").focus();
					}
				}).appendTo(tip);
				
				//tip.append("<span>" + strr + "</span>");
			});
			
			//console.log("ttop " + evnt.target.offsetTop + " ptop " + pos.top);
			tip.css({
				left: evnt.target.offsetLeft + pos.left,
				top: evnt.target.offsetTop + pos.top + 2
			}).show();
		}
		returndict.keystring = currentinput;
		returndict.carry = carry;
		returndict.replacement = replacement;
		
		

		
        return returndict;
		
    }
};
define({"avroim":avroim});