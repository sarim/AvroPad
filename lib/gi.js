define({
	Gio: {
		"DataInputStream":{
			"new": function(path){
				// return a datastream
			}
		},
		"File" : {
			"new_for_path" : function(){
				
			},
			"query_exists" : function(){
				return false;
			},
			"delete" : function(){
				return false;
			},
		}
	},
	GLib: {"get_home_dir" : function(){ return window.location.host ;}}
})