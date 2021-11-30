$(document).ready(function() {

    $(".btnLeft").click(function() {
    $('#t_soxa').text('Ta’lim sohasi');
        $.ajax({
            url:'materiallar',
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

                if (response['auth']) {
                    $.each(response['s'], function(k1, v1) {
                        $('#soxa').append('<div class="select__list-item" data-item="true">'+v1.name+'</div>');

                        $.each(response['q'], function(k, v) {
                            if (v1.id == v.tSoxa_id){
                                if (v.img == null) {
                                $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                                } else {
                                    $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                                }
                                n++
                            }
                        })
                    });

                    $('#soxa').click(function(e) {

                    $('#t_soxa').text(e.target.textContent);
                    n=0
                    $('#id_basic').empty();
                    $.each(response['s'], function(k1, v1) {
                        if (v1.name == e.target.textContent) {
                            $.each(response['q'], function(k, v) {
                                if (v.tSoxa_id == v1.id) {
                                    if (v.img == null) {
                                    $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                                    } else {
                                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="Topilmadi">Yuklab olish</a></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                                    }
                                    n++
                                }
                            })
                        }
                    })

                    $('#main2infoNum').text(n);
                });
                } else {
                    $.each(response['s'], function(k1, v1) {
                        $('#soxa').append('<div class="select__list-item" data-item="true">'+v1.name+'</div>');

                        $.each(response['q'], function(k, v) {
                            if (v1.id == v.tSoxa_id){
                                if (v.img == null) {
                                $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                                } else {
                                    $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                                }
                                n++
                            }
                        })
                    });

                    $('#soxa').click(function(e) {

                    $('#t_soxa').text(e.target.textContent);
                    n=0
                    $('#id_basic').empty();
                    $.each(response['s'], function(k1, v1) {
                        if (v1.name == e.target.textContent) {
                            $.each(response['q'], function(k, v) {
                                if (v.tSoxa_id == v1.id) {
                                    if (v.img == null) {
                                    $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="static/img/no_photo.png" alt=""></a></div></div></div>');
                                    } else {
                                        $('#id_basic').append('<div class="col"><div class="card1"><div class="textbox"><p>'+v1.name+'</p><a href="o\'qitish materiallari/'+v.id+'" class="h2">'+v.name+'</a><button class="download user-kirish">Ro\'yxatdan o\'tish</button></div><div class="imgbox"><a href="o\'qitish materiallari/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                                    }
                                    n++
                                }
                            })
                        }
                    })

                    $('#main2infoNum').text(n);
                });
                }
                $('#main2infoNum').text(n);
            },
            error: function(res) {
                console.log(res)
            }
        });
    });

    $(document).on('click','.user-kirish', function(){
        $('#loginbox').css('display', 'flex');
        $('#login').css('display', 'block');
        $('#signup').css('display', 'none');
    });
});