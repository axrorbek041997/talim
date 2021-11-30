$(document).ready(function() {
    $('#cardRow').hide();
    $('#id_basic').show();
    $('video_size').hide();
    $('main2infoNum').show();

    $(".btnLeft").click(function() {
        var btn_id = $(this).val();

        $('#mahsulot-name').text(btn_id = $(this).val());

        if (btn_id == 'Video resurslar'){
            $('#id_basic').hide();
            $('#main2infoNum').hide();
            $('#cardRow').show();
            $('#video_size').show();
        } else {
            $('#id_basic').show();
            $('#cardRow').hide();
            $('#main2infoNum').show();
            $('#video_size').hide();
            $.ajax({
                url:'muddatli_kurslar',
                type:'get',
                data: {
                    selected: $(this).val()
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    $('#id_basic').empty();
                    n=0

                    console.log(response['tur']);
                    console.log(response['s'][0]);

                    if (response['info']){
                        $.each(response['s'], function(k, v) {
                            if (v.video == null){
                                $('#id_basic').append('<div class="col"><a href="media/'+v.img+'" target="_blank" class="card2"><div class="textbox"><p>'+response['tur'][v.kurs_tur_id_id]+'</p><h2>'+v.name+'</h2></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                            }
                            n++
                        })
                    } else {
                        $.each(response['s'], function(k, v) {
                            if (v.video == null){
                                if (v.img == null) {
                                    $('#id_basic').append('<div class="col"><a href="kurslar/'+v.id+'" target="_blank" class="card2"><div class="textbox"><p>'+response['tur'][v.kurs_tur_id_id]+'</p><h2>'+v.name+'</h2></div><div class="imgbox"><div><img src="static/img/no_photo.png" alt=""></div></div></a></div>');
                                } else {
                                    $('#id_basic').append('<div class="col"><a href="kurslar/'+v.id+'" target="_blank" class="card2"><div class="textbox"><p>'+response['tur'][v.kurs_tur_id_id]+'</p><h2>'+v.name+'</h2></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                                }
                            }
                            n++
                        })
                    }

                    $('#main2infoNum').text(n);
                },
                error: function(res) {
                    console.log(res)
                }
            });
        }
    })
})
