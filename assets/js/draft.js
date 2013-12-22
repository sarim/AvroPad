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
        var d = {};
        d.indexs = [];
        d.data = {};
        return d;
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
