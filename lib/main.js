$ = function(id){
	return document.getElementById(id)
}
setstatus = function(stext){
	if (window.jQuery)
		$("#status").text(stext);	
	else
		$("status").innerHTML = stext;
	
}

print = function(a){
	console.log(a);
}


requirejs.onError = function(e){
	setstatus("Error occured, reload to try again\nIf you error still persists contact the maintainer");
}

_loadlib = function(n){
	try{
		m = modules[n];
		setstatus("Loadding module " + (n+1) + "/" + modules.length);
		requirejs([m],function(mb){
			window.imports[m] = mb;
			console.log("Loaded " + m);
			setstatus("Loaded module " + (n+1) + "/" + modules.length);
			if (n < modules.length - 1){
				_loadlib(n+1);
			}
			else{
			
				db = imports.avrodict;
				RegexServer = imports.avroregexlib;
				gio = imports.gi.Gio;
				GLib = imports.gi.GLib;
				dictsearch = imports.dbsearch;
				autocorrectdb = imports.autocorrect.db;
				Avroparser = imports.avrolib.OmicronLab.Avro.Phonetic;
				window.utfconvs = imports.utf8;
				EditDistance = imports.levenshtein;
				suffixDict = imports.suffixdict.db;
				suggestion = imports.suggestionbuilder;
				window.suggestionBuilder = new suggestion.SuggestionBuilder();
			    
				/*
				$('#btn').click(function(ev){
					lstt = suggestionBuilder.suggest($("#entext").val());
					$("#entext").val(lstt.words.join("\n"));
				});
				*/
				$("textarea").bnKb({
				                    'switchkey': {"webkit":"k","mozilla":"y","safari":"k","chrome":"k","msie":"y"},
				                    'driver': imports.avroim.avroim
				                });
				setstatus("All Module Loaded");
				$("#entext").fadeIn()
			}
		});
	}
	catch (e)
	{
		setstatus("Error occured, reload to try again");
	}
}
		
imports = {};
modules = [
'utf8',
'suffixdict',
'autocorrect',
'avrodict',
'levenshtein',
'avrolib',
'avroregexlib',
'dbsearch',
'gi',
'suggestionbuilder',
'jquery',
'caretposition',
'avroim',
'engine'
]
window.addEventListener('load',function(){
	_loadlib(0);
});
