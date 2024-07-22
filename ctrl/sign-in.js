$(function(){

    if(!($('#email-sign-in').val() && $('#pw-sign-in').val())){
        showEmailError()
        showErrorPassword()
    }

    if(!($('#email-sign-in').val())){
        showEmailError()
    }else if(!($('#pw-sign-in').val())){
        showErrorPassword()
    }
   
})

function showEmailError(){
    $('#sign-in-form').on('submit',function(event){
        event.preventDefault()
        let email_input = $('#email-sign-in').val()
        if(!email_input){
            $('#error-msg').removeClass('d-none').css({
                'color' : 'red',
            });
            $('#email-sign-in').css({
                'border-color' : 'red',
            })
        }else{
            $('#error-msg').addClass('d-none');
        }
    });
    $('#email-sign-in').on('input',function(event){
        event.preventDefault()
        let email_input = $(this).val()
        if(!email_input){
            $('#error-msg').removeClass('d-none');
        }else{
            $('#error-msg').addClass('d-none');
        }
    });
}

function showErrorPassword(){
    $('#sign-in-form').on('submit',function(event){
        event.preventDefault()
        var password_input = $('#pw-sign-in').val();
        if(!password_input){
            $('#error-msg-pw').removeClass('d-none').css({
                'color' : 'red',
            });
            $('#pw-sign-in').css({
                'border-color' : 'red',
            })
        }else{
            $('#error-msg').addClass('d-none');
        }
    });
    $('#pw-sign-in').on('input',function(event){
        event.preventDefault()
        let email_input = $(this).val()
        if(!email_input){
            $('#error-msg-pw').removeClass('d-none');
        }else{
            $('#error-msg-pw').addClass('d-none');
        }
    });
}