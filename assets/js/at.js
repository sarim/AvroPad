//this is prod version of log. totally silent.
if (typeof window.log == "undefined") {
    log = function () {}
}

//init the avro
var megusta = new AvroPhonetic(lSLoader, lSSaver);

//toggle the language button
function toggleLang() {
    if ($('#chklang').prop('checked')) {
        $('#chklang').prop('checked', false);
        $('#langflash').html("EN");
    } else {
        $('#chklang').prop('checked', true);
        $('#langflash').html("BN");
    }
    if (checkInView('label')) {
        $('#langflash').fadeIn(200).delay(300).fadeOut(300);
    }
}

// element isVisible. taken from http://stackoverflow.com/a/16309126/726122 but modified
function checkInView(elem,partial)
{
    var container = $("body");
    var contTop = container.scrollTop();

    var elemTop = $(elem).offset().top - container.offset().top;
    var elemBottom = elemTop + $(elem).height() / 2;
    $('#langflash').css({top: contTop});
    return elemBottom < contTop ;
}

//setup all the awesomeness
$(function(){
    //remote loading..
    $("#loading").remove();
    
    var inp = $('#inputor').prop( "disabled", false ).atwho({
        at: '',
        data: {},
        tpl:"<li data-value='${name}' data-select='${selected}'>${name}</li>",
        start_with_space: false,
        limit: 11,
        callbacks:
        {
           //just match everything baby :3
           matcher: function (flag, subtext) {
               if (! $('#chklang').prop('checked')) return null; // always return null when user selects english
               res = subtext.match(/\s?([^\s]+)$/);
               log(subtext, res);
               if (res == null) return null;
               var bnregex = /[\u0980-\u09FF]+$/;
               if (bnregex.exec(res[1])) return null;
               return res[1];
           },
           //main work is done here
           filter: function (query, data, search_key) {
               log(query, data, search_key);
               var bnarr = megusta.suggest(query);
               var bndict = [];
               bnarr.words = bnarr.words.slice(0,10);
               if (megusta.candidate(query) == query) {
                   bnarr.prevSelection = bnarr.words.length;
               }
               bnarr.words.push(query);
               bnarr.words.forEach( function(a,i) {
                   bndict.push({id: i, name: a, selected: (i == bnarr.prevSelection)  });
               });
               return bndict;
           },
           before_insert: function (value, li) {
               //save the selected value to user preferences;
               megusta.commit(this.query.text, value);
               return /*" " +*/ value;
           },
           // Next two callback will mess up suggestion list if not overriden.
           sorter: function (query, items, search_key) {
               return items;
           },
           highlighter: function (li, query) {
               return li;
           },
           rendered: function (ul) {
               ul.find('.cur').removeClass('cur');
               return ul.find("li[data-select=true]").addClass("cur");
           }
        }
    }).focus();
    
    $(document).on("keydown", function (e){
        if (e.ctrlKey && "K".charCodeAt(0) == e.keyCode) {
            e.preventDefault();
            toggleLang();
        }
    });
    
    var hammer = $("html").hammer();
    hammer.on("swipeleft", function() {
        toggleLang();
    });
    hammer.on("swiperight", function() {
        toggleLang();
    });
    
    $("ul").hammer().on("touch", function(e) {
        log("touch", e);
        $('.cur').removeClass('cur');
        $(e.target).addClass('cur');
    });
});

$(window).load(function() {
    $('#inputor')[0].scrollIntoView();
});