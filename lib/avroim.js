var avroim = {
	keymaps: {
		's':"স"
	},
    supportIntellisense: true,
    intellisense: function(currentinput, lastcarry,evnt){
		returndict = {};
        console.log(JSON.stringify(currentinput) + " <- current | carry -> " + JSON.stringify(lastcarry));
		carry = lastcarry + currentinput;
		//replacement = currentinput;
		
		returndict.type = 1;
		replacement = Avroparser.parse(carry);
		returndict.lastInsertedString = Avroparser.parse(lastcarry);
		suggestlist = suggestionBuilder.suggest(carry);
		//console.log(replacement);
		var tip = $('#tip');

		if (currentinput == " " || currentinput == "\r") {
			
			carry = "";
			tip.hide();
			console.log("hidden");
		}else{
			var pos = $(evnt.target).getCaretPosition();
			tip.text(suggestlist.words.join(" | "));
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