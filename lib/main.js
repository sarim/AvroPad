$ = function(id){
	return document.getElementById(id)
}
setstatus = function(stext){
	$("status").innerHTML = stext;
	
}

print = function(a){
	console.log(a);
}

require.config({
  waitSeconds: 300
  // timeout to 5 minute
});

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
			
				$('btn').onclick = function(){
					lstt = suggestionBuilder.suggest($("entext").value);
					$("entext").value = lstt.words.join("\n");
				}
				setstatus("All Module Loaded");
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
'autocorrect',
'avrodict',
'avrolib',
'avroregexlib',
'dbsearch',
'levenshtein',
'sarim',
'suffixdict',
'utf8',
'gi',
'suggestionbuilder'
]
window.addEventListener('load',function(){
	_loadlib(0);
});
