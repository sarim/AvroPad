//this is prod version of log. totally silent.
if (typeof window.log == "undefined") {
    log = function () {}
}

//init the avro
var megusta = new AvroPhonetic(lSLoader, lSSaver);
var midHeight = 0;
//toggle the language button
var langbn = true;
function toggleLang() {
    var cV = checkInView('#indicator');
    if (cV) {
        $('#indicator').offset({left:0,top:$('body').scrollTop()}).hide();
        $('#indicator').fadeIn(200);
    }
	if (langbn) {
		$(".indicator-glow").fadeOut(100);
		langbn = false;
	} else {
		$(".indicator-glow").fadeIn(100);
		langbn = true;
	}
    if (cV) {
        $('#indicator').delay(300).fadeOut(300, function(){
            $('#indicator').show().offset({left:0,top:0});
        });
    }
}

function isMobile() {
	if (matchMedia("screen and (min-width:800px)").matches)
		return false;
	else {
        midHeight = $(window).height() - $("#rightbar").height() - 85 - 20;
	    return true;
	}		
}

// from http://stackoverflow.com/a/15710692/726122
String.prototype.hash = function(){
  return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

// element isVisible. taken from http://stackoverflow.com/a/16309126/726122 but modified
function checkInView(elem,partial)
{
    var container = $("body");
    var contTop = container.scrollTop();

    var elemTop = $(elem).offset().top - container.offset().top;
    var elemBottom = elemTop + $(elem).height() * 2;
    return elemBottom < contTop ;
}

function shortDate() {
    var dateFrag = new Date().toTimeString().split(":");
    var h = dateFrag[0];
    var dd = "AM";
    if (h >= 12) {
        h = h-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    return dateStr = '[' + h + ":" + dateFrag[1] + " " + dd + ']';
}

function createDraft(draftObj, key, prepend) {
    $li = $("<li>").attr('data-key', key);
    $title = $("<span>", {class: "title", html: draftObj.title });
    $small = $("<small>");
    $timeago = $("<time>", {class: "timeago"}).attr('datetime', draftObj.time).appendTo($small);
    
    $button = $("<div>", {class: "libutton"});
    $editbtn = $("<span>", {class: "btn editbtn icon-pencil", html: ""}).appendTo($button);
    $delbtn = $("<span>", {class: "btn delbtn icon-remove", html: ""}).appendTo($button);

    $button.appendTo($li);
    $title.appendTo($li);
    $small.appendTo($li);
    prepend ? $li.prependTo(".draft ul") : $li.appendTo(".draft ul");
    
    $timeago.timeago();
    $("li.active").removeClass("active");
    $li.addClass("active");
}

function setupDraftEvent() {
    //these are direct events
    $("#insertDraft").click(function(){
        $('#inputor').attr("data-key",insertDraft());
    });
    $("saveDraft").click(function(){
        updateDraft($('#inputor').attr('data-key'),$('#inputor').val());
    })
    //all these are delegated events
    $("div.draft").on('mouseleave', "ul", function(){
        $(".libutton").hide();
    });

    $("div.draft").on('mouseenter', "li", function(){
        log("li mouseenter");
        $(".libutton").hide();
        $(this).find(".libutton").css({top: this.offsetTop+"px", right: "0px" }).show();
    });
    
    $("div.draft").on('click', "li", function(){
        if (! $(this).attr('contenteditable')) {
            $("li.active").removeClass("active");
            $(this).addClass("active");
            updateDraft($('#inputor').attr('data-key'),$('#inputor').val());
            $hash = $(this).attr('data-key');
            $('#inputor').val(draftData.data[$hash].content);
            $('#inputor').attr('data-key', $hash);
        }
    });
    
    $("div.draft").on('click', "span.editbtn", function(e){
        e.stopPropagation();
        $(".libutton").hide();
        $(this).parent().parent().find(".title").attr("contenteditable", 'true').select().focus();
    });
    
    $("div.draft").on('click', "span.delbtn", function(e){
        e.stopPropagation();
        $(".libutton").hide();
        $li = $(this).parent().parent();
        removeDraft($li.attr('data-key'));
        $li.remove();
    });
    
    $("div.draft").on('blur', "span.title", function(e){
        log("Save Title: " + this.textContent);
        $(this).removeAttr("contenteditable");
        var curHash = $(this).parent().attr('data-key');
        draftData.data[curHash].updateTime($(this).parent().find("time")).title = this.textContent;
    });
    $("div.draft").on('keydown', "span.title", function(e){
        if (e.keyCode == 13 || e.charCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
}

function insertDraft() {
    var newdraft = {
        title: "Untitled Draft " + shortDate() ,
        time: new Date().toISOString(),
        content: ''
    };
    newdraft.updateTime = function(timeElem) {
        newdraft.time = new Date().toISOString();
        if (timeElem) {
            timeElem.attr('datetime', newdraft.time);
            timeElem.timeago('updateFromDOM');
        }
        return newdraft;
    }
    var dHash = newdraft.time.hash();
    draftData.data[dHash] = newdraft;
    draftData.indexs.unshift(dHash);
    createDraft(newdraft, dHash, true);
    return dHash;
}

function loadDrafts() {
    if (localStorage.AvroDrafts) {
        var d = JSON.parse(localStorage.AvroDrafts);
        for (ix in d.data) {
            d.data[ix].updateTime = function(timeElem) {
                d.data[ix].time = new Date().toISOString();
                if (timeElem) {
                    timeElem.attr('datetime', d.data[ix].time);
                    timeElem.timeago('updateFromDOM');
                }
                return d.data[ix];
            }
        }
        return d;
    } else {
        return false;
    }
}

function updateDraft(hash, content) {
    draftData.data[hash].content = content;
    saveDrafts();
}

function removeDraft(hash) {
    delete draftData.data[hash];
    var newIndex = [];
    draftData.indexs.forEach(function(i){
        if (i != hash) newIndex.push(i);
    })
    delete draftData.indexs;
    draftData.indexs = newIndex;
    saveDrafts();
}

function saveDrafts() {
    setTimeout(function() {
        localStorage.AvroDrafts = JSON.stringify(draftData);
    },1);
}

//setup all the awesomeness
$(function(){
    //remove loading..
    $("#loading").remove();
    
	$("#indicator").on("click touchstart", function(e){
		e.preventDefault();
		toggleLang();
		$("#inputor").focus();
	});
    
    if (isMobile()) {
        $("#middle").css({"min-height": (midHeight + 20) + "px"});
    }
    
    window.draftData = loadDrafts();
    if (draftData) {
        draftData.indexs.forEach(function(d) {
            createDraft(draftData.data[d], d);
        });
    } else {
        draftData = {};
        draftData.indexs = [];
        draftData.data = {};
    }
    setupDraftEvent();
    var newH = insertDraft();
    
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
               if (! langbn) return null; // always return null when user selects english
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
               var qtxt = this.query.text;
               setTimeout(function(){
                   megusta.commit(qtxt, value);
                   updateDraft($('#inputor').attr('data-key'),$('#inputor').val());
               },10);
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
    }).on('keyup focus',function(e){
		if (isMobile()) {
			$(this).height( midHeight );
		    $(this).height( midHeight > this.scrollHeight ? midHeight : this.scrollHeight );
		}
    }).focus().attr('data-key', newH);
    
    $(document).on("keydown", function (e){
        //charCode of dot is 46, but event keyCode is 190 for dot. Need to figure this out.
        if (e.ctrlKey && [190,110].indexOf(e.keyCode) !== -1 ) {
            e.preventDefault();
            toggleLang();
        }
    });
    
    var hammer = $("html").hammer();
    hammer.on("swipeleft swiperight", function() {
        if (window.twoFingerTouch) toggleLang();
    });
    hammer.on("touch", function(e){
        //check if two touch event are present, which means two finger touch
        if (e.gesture.touches['0'] && e.gesture.touches['1']) {
            window.twoFingerTouch = true;
        }
    });
    
    hammer.on("release", function(e){
        window.twoFingerTouch = false;
    });

    $(document).on("touchmove", function(e){
        if (window.twoFingerTouch) e.preventDefault();
    });
    
    var ulHammer = $("ul").hammer();
    ulHammer.on("touch", function(e) {
        log("touch", e);
        $('.cur').removeClass('cur');
        $(e.target).addClass('cur');
    });
    
    ulHammer.on("release", function(e) {
        log("release");
        $(e.target).trigger("customInsert",e);
    });
    
});

$(window).load(function() {
    $('#inputor')[0].scrollIntoView();
});