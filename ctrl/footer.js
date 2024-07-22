$(function(){
    $.get('/movie/footer.html',function(data){
        $('#footer').html(data);
    })
})