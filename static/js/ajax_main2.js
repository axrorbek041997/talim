$(document).ready(function() {

    var my_res = null;

    $(".btnLeft").click(function() {
        $('#t_soxa').text('Ta’lim sohasi');

        $.ajax({
            url:'qo\'llanmalar',
            type:'get',
            data: {
                selected: $(this).val()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                $('#soxa').empty();
                $('#id_basic').empty();
                n=0

                my_res = response;

                if (response['auth']) {
                    $.each(response['s'], function(k1, v1) {
                        $('#soxa').append('<div class="select__list-item" data-item="true">'+v1.name+'</div>');
                    })

                    $.each(response['q'], function(k, v) {
                        if (v.img == null) {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v.tSoxa_id__name+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v.tSoxa_id__name+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                        }
                        n++
                    })

                } else {
                    $.each(response['s'], function(k1, v1) {
                        $('#soxa').append('<div class="select__list-item" data-item="true">'+v1.name+'</div>');
                    })

                    $.each(response['q'], function(k, v) {
                        if (v.img == null) {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v.tSoxa_id__name+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v.tSoxa_id__name+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                        }
                        n++
                    })
                }
                $('#main2infoNum').text(n);
            },
            error: function(res) {
                console.log(res)
            }
        })
    })

    $('#soxa').click(function(e) {
        $('#t_soxa').text(e.target.textContent);
        n = 0;
        $('#id_basic').empty();

        $.each(my_res['q'], function(k, v) {
            if (e.target.textContent == v.tSoxa_id__name) {
                if (my_res['auth']) {
                    if (v.img == null) {
                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+e.target.textContent+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                    } else {
                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+e.target.textContent+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                    }
                } else {
                    if (v.img == null) {
                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+e.target.textContent+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                    } else {
                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+e.target.textContent+'</p><a href="o\'quv qo\'llanma/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'quv qo\'llanma/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                    }
                }
            n++
            }
        })

        $('#main2infoNum').text(n);
    })

    $(document).on('click','.user-kirish', function(){
        $('#loginbox').css('display', 'flex');
        $('#login').css('display', 'block');
        $('#signup').css('display', 'none');
    });
})