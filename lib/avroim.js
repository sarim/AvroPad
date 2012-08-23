var avroim = {
    supportIntellisense: true,
    intellisense: function(currentinput, lastcarry,evnt){
		returndict = {};
        console.log(JSON.stringify(currentinput) + " <- current | carry -> " + JSON.stringify(lastcarry));
		carry = lastcarry + currentinput;
		//replacement = currentinput;
		
		returndict.type = 1;
		
		suggestlist = suggestionBuilder.suggest(carry);
		replacement = suggestlist.words[0];
		returndict.lastInsertedString = suggestionBuilder.suggest(lastcarry).words[0];
		
		
		//console.log(replacement);
		var tip = $('#tip');

		if (currentinput == " " || currentinput == "\r") {
			
			carry = "";
			tip.hide();
			console.log("hidden");
		}
		else if (currentinput == "" && lastcarry == "") {
			tip.hide();
		}
		else{
			
			var pos = $(evnt.target).getCaretPosition();
			tip.empty();
			suggestlist.words.unshift(carry);
			suggestlist.words.forEach(function(strr){
				$('<span/>', {
				    text: strr,
					click : function(ev){
						$("#entext").trigger("cmttxt",[$(this).text(),tip]);
					}
				}).appendTo(tip);
				
				//tip.append("<span>" + strr + "</span>");
			});
			
			console.log("ttop " + evnt.target.offsetTop + " ptop " + pos.top);
			tip.css({
				left: evnt.target.offsetLeft + pos.left,
				top: evnt.target.offsetTop + pos.top + 2
			}).show();
		}
		returndict.keystring = currentinput;
		returndict.carry = carry;
		returndict.replacement = replacement;
		//console.log(evnt);
		

		
        return returndict;
		
    }
};
define({"avroim":avroim});