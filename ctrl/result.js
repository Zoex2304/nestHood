$(function(){
    var url = new URLSearchParams(window.location.search);
    var query = url.get('query');

    if(query){
        search(query,"movie");
    }
});