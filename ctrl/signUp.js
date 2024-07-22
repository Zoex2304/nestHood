$(function(){
    showError()
});

function showError(){
    $('#sign-up-form').on('submit',function(event){
        event.preventDefault();
        let email_input = $('#email-end-point').val()
        if(!email_input){
            $('#error-msg').removeClass('d-none').css({
                'color' : 'red',
            });
            $('#email-end-point').css({
                'border-color' : 'red'
            })
        }else{
            $('#error-msg').addClass('d-none');
        }
    });

    $('#email-end-point').on('input',function(){
       if(!($(this).val())){
         $('#error-msg').removeClass('d-none');
       }else{
        $('#error-msg').addClass('d-none');
       }
    })
}