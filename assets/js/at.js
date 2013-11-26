// using console.log from log function, so it'll be easier to remove disable log later.
function log() {
    console.log.apply(console,arguments);
}

//init the avro
var megusta = new AvroForGaia();

//setup all the awesomeness
$(function(){
    //remote loading..
    $("#loading").remove();
    
    var inp = $('#inputor').prop( "disabled", false ).atwho({
        at: '',
        data: {},
        tpl:"<li data-value='${name}'>${name}</li>",
        start_with_space: false,
        limit: 10,
        callbacks:
        {
           //just match everything baby :3
           matcher: function (flag, subtext) {
               if (! $('#chklang').prop('checked')) return null; // always return null when user selects english
               res = subtext.match(/\s?([^\s]+)$/);
               log(subtext, res);
               if (res == null) return null;
               return res[1];
           },
           //main work is done here
           filter: function (query, data, search_key) {
               log(query, data, search_key);
               var bnarr = megusta(query);
               var bndict = [];
               bnarr.forEach( function(a,i) {
                   bndict.push({id: i, name: a});
               });
               return bndict;
           },
           before_insert: function (value, li) {
               //TODO: save the selected value to user preferences;
               return /*" " +*/ value;
           },
           // Next two callback will mess up suggestion list if not overriden.
           sorter: function (query, items, search_key) {
               return items;
           },
           highlighter: function (li, query) {
               return li;
           }
        }
    }).focus();
    
    $(document).on("keydown", function (e){
        if (e.ctrlKey && "K".charCodeAt(0) == e.keyCode) {
            e.preventDefault();
            if ($('#chklang').prop('checked')) {
                $('#chklang').prop('checked', false);
            } else {
                $('#chklang').prop('checked', true);
            }
        }
    });
    
});

$(window).load(function() {
    $('#inputor')[0].scrollIntoView();
});