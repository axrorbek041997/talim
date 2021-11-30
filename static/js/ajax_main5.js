$(document).ready(function() {
    $(".btnLeft").click(function() {
        $.ajax({
            url:'jurnallar',
            type:'get',
            data: {
                selected: $(this).val()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {

                $('#id_basic').empty();
                n=0

                if (response['auth']) {
                    $.each(response['s'], function(k, v) {
                        if (v.img == null) {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+response['d'][v.year_id]+' '+v.soni+'</p><a href="#" class="h2">Kasb-hunar talimi jurnali</a><a href="media/'+v.pdf+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="">Yuklab olish</a></div><div class="imgbox"><a href="#"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+response['d'][v.year_id]+' '+v.soni+'</p><a href="#" class="h2">Kasb-hunar talimi jurnali</a><a href="media/'+v.pdf+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="">Yuklab olish</a></div><div class="imgbox"><a href="#"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                        }
                        n++
                    });
                } else {
                    $.each(response['s'], function(k, v) {
                        if (v.img == null) {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+response['d'][v.year_id]+' '+v.soni+'</p><a href="#" class="h2">Kasb-hunar talimi jurnali</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="#"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+response['d'][v.year_id]+' '+v.soni+'</p><a href="#" class="h2">Kasb-hunar talimi jurnali</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="#"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                        }
                        n++
                    });
                }

                $('#main2infoNum').text(n);
            },
            error: function(res) {
                console.log(res);
            }
        });
    });

    $(document).on('click','.user-kirish', function(){
        $('#loginbox').css('display', 'flex');
        $('#login').css('display', 'block');
        $('#signup').css('display', 'none');
    });
});