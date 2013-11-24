function range(a,b) {
    var r = [];
    for (;a<=b;++a) {
        r.push(a);
    }
    return r;
}
$(function(){
    $inputor = $('#inputor');
    range(97,122).concat(range(65,90)).forEach(function(c){
        $inputor.atwho({
            at: String.fromCharCode(c),
            data: 0,
            tpl:"<li data-value=':${key}:'>${name} <img src='http://a248.e.akamai.net/assets.github.com/images/icons/emoji/${name}.png' height='20' width='20' /></li>"
        });
    });    
});
