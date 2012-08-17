$ = function(id){
	return document.getElementById(id)
}
_loadlib = function(n){
	m = modules[n];
	//console.log("Loadding " + m);
	requirejs([m],function(mb){
		window.imports[m] = mb;
		console.log("Loaded " + m);
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
			utfconvs = imports.utf8;
			EditDistance = imports.levenshtein;
			suffixDict = imports.suffixdict.db;
			$('btn').onclick = function(){
				if(! window.pk)
				window.pk = new dictsearch.DBSearch ();
				lstt = pk.search($("entext").value);
				$("entext").value = lstt.join("\n");
			}
		}
	});
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
_loadlib(0);
