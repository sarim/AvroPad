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
        at: 'a',
        data: {},
        tpl:"<li data-value='${name}'>${name}</li>",
        start_with_space: false,
        limit: 10,
        callbacks:
        {
           //just match everything baby :3
           matcher: function (flag, subtext) {
               res = subtext.match(/\s?(\w+)$/);
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
               return " " + value;
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
    
});