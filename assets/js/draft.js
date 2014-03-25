var myDraft = function($scope) {
    $scope.drafts = [];
    
    if (localStorage.avroDrafts) {
        JSON.parse(localStorage.avroDrafts).forEach(function(a){
            var newDraft = {name: a.name, date: new Date(a.date), content: a.content};
            $scope.drafts.push(newDraft);
        });
    }

    $scope.on_select_draft = function(d) {
        $scope.selected_draft = d;
    };

    $scope.on_add_draft = function() {
        var newDraft = {name: "Draft "+($scope.drafts.length+1), date: new Date(), content: ""};
        $scope.drafts.push(newDraft);
        $scope.selected_draft = newDraft;
        
        if ($scope.drafts.length > 5) $scope.drafts.splice(0, 1);
    };

    $scope.on_del_draft = function(index) {
        var curindex = -1;
        var delcurrent = false;
        
        if (index === undefined) {
            curindex = ($scope.drafts.indexOf($scope.selected_draft));
            delcurrent = true;
        } else {
            curindex = ($scope.drafts.indexOf(index));
            if (index == $scope.selected_draft) delcurrent = true;
        }
        
        if (curindex > -1) {
            $scope.drafts.splice(curindex, 1);
        }
                            
        if ($scope.drafts.length == 0) {
            $scope.on_add_draft();
        }
        
        if (delcurrent) $scope.selected_draft = $scope.drafts[$scope.drafts.length-1];
        
        $scope.on_save_draft();
    };
    
    $scope.on_edit_draft = function() {
        var newName = prompt("Enter name", $scope.selected_draft.name);
        if (newName) $scope.selected_draft.name = newName;
        $scope.on_save_draft();
    }
    
    $scope.on_save_draft = function() {
        localStorage.avroDrafts = JSON.stringify($scope.drafts);
        $("#savenotif").fadeIn().delay(200).fadeOut().fadeIn().delay(200).fadeOut();
    }
    
    $scope.on_update_draft = function() {
        $scope.selected_draft.date = new Date();
    }
    
    $scope.on_add_draft();
    
};

$(document).on('click', '.draft_edit', function(){
    $(this).parent().find(".draft_name").removeAttr('readonly').off('blur').on('blur', function(){
        $(this).attr('readonly','readonly');
        var anguscope = angular.element(this).scope();
        anguscope.on_save_draft();
    }).focus();
});

$(document).on('keyup', 'textarea', function(e){
    if (e.keyCode == 32 || e.keyCode == 13) {
        var anguscope = angular.element(this).scope();
        anguscope.on_update_draft();
        anguscope.on_save_draft();
    }
});