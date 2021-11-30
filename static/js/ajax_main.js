$(document).ready(function() {
    var page_list = [];
    var page_number = 1;
    var last_page=true;
    var t_soxa = '';
    var t_yun = '';
    var b_soxa = '';
    var t_daraja = '';

    $(".btnLeft").click(function() {
        page_number = 1
        last_page = true;

        b_soxa = $(this).val();
        $('#t_daraja').text('Ta’lim darajasi');
        $('#id_t_yunalish').text('Ta’lim yo’nalishi');
        $('#id_t_soxa').text('Ta’lim sohasi');

        if ($(this).val() == 'Umumta\'lim fanlari') {
            $(".select").hide();
            $('#id_basic_kasb').text("Umumta'lim fanlari");
        } else {
            $(".select").show();
            $('#id_basic_kasb').text("Kasb va mutaxassisliklar");
        }

        $.ajax({
            url: "meyorlar",
            type: 'get',
            data: {
                selected: $(this).val(),
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                var new_options = response
                $("#t_yunalish").empty();
                $("#t_soxa").empty();
                $("#id_basic").empty();

                $('#main2infoNum').text(response['size']);

                $.each(response['yun'], function(key, value) {
                    jQuery('<div/>', {
                            id: 'yun',
                            class: 'select__list-item',
                             text: value.name
                        }).appendTo('#t_yunalish');
                });

                page_list=response['kasb'];

                $.each(response['soxa'], function(key, value) {
                    jQuery('<div/>', {
                            id: 'sox',
                            class: 'select__list-item',
                             text: value.name
                        }).appendTo('#t_soxa');
                });

                n=0;
                $.each(response['kasb'], function(key, value) {
                    if (n < 10) {
                        if (value._id[0] == '2'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if (value._id[0] == '3'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if  (value._id[0] == '4') {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        }
                        n++;
                    }
                });
            },
            error: function(res) {
                console.log(res)
            }
        })
    });

    $('body').click(function (e) {
        if (e.target.id == "sox") {
            page_number = 1
            last_page = true;
            t_soxa = e.target.textContent;

            $("#id_basic").empty();
            $("#t_yunalish").empty();
            $('#id_t_soxa').text(e.target.textContent);

            $('#t_daraja').text('Ta’lim darajasi');
            $('#id_t_yunalish').text('Ta’lim yo’nalishi');

            $.ajax({
                url: 'meyorlar',
                type: 'get',
                data: {
                    selected: 'soxa',
                    sox: t_soxa
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    $('#main2infoNum').text(response['kasb'].length);

                    page_list = response['kasb'];
                    n=0;
                    $.each(response['kasb'], function(key, value){
                        if (n < 10) {
                            if (value._id[0] == '2'){
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else if (value._id[0] == '3'){
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else if  (value._id[0] == '4') {
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else {
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            }
                            n++;
                        }
                    });

                    $.each(response['yun'], function(key, value) {
                        jQuery('<div/>', {
                            id: 'yun',
                            class: 'select__list-item',
                             text: value.name
                        }).appendTo('#t_yunalish');
                    });
                }, error: function(res) {
                    console.log(res);
                }
            });
        }

        if (e.target.id == "yun") {

            page_number = 1;
            last_page = true;
            t_yun = e.target.textContent;

            $("#id_basic").empty();
            $('#id_t_yunalish').text(e.target.textContent);
            $('#t_daraja').text('Ta’lim darajasi');

            $.ajax({
                url: 'meyorlar',
                type: 'get',
                data: {
                    selected: 'yunalish',
                    yun: e.target.textContent
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {

                    $('#main2infoNum').text(response['kasb'].length);
                    n=0;

                    page_list = response['kasb'];
                    $.each(response['kasb'], function(key, value) {
                        if (n < 10) {
                            if (value['_id'][0] == '2'){
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumt\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else if (value['_id'][0] == '3'){
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else if (value['_id'][0] == '4') {
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            } else {
                                $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                            }
                            n++;
                        }
                    })
                }
            });
        }
    });

    $('.daraja').click(function(e) {

        if (e.target.id == "daraja1") {
            t_daraja = '3';
        } else if (e.target.id == "daraja2") {
            t_daraja = '4';
        } else {
            t_daraja = '5';
        }

        page_number = 1;
        last_page = true;
        $("#id_basic").empty();

        $.ajax({
            url: 'meyorlar',
            type: 'get',
            data: {
                selected: 'daraja',
                t_soxa: t_soxa,
                t_yun: t_yun,
                b_soxa: b_soxa,
                t_daraja: t_daraja
            },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(response) {
                $('#main2infoNum').text(response['kasb'].length);
                page_list = response['kasb'];
                n=0;
                $.each(response['kasb'], function(key, value){
                    if (n < 10) {
                        if (value._id[0] == '2'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if (value._id[0] == '3'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if  (value._id[0] == '4') {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        }
                        n++;
                    }
                });

            }, error: function(res) {
                console.log(res);
            }

        });
    })

    $('#more-main1').click(function() {
        if (page_list.length != 0) {
            if (page_list.length >= (page_number+1)*10) {
                $.range(page_number*10, (page_number+1)*10, 1).forEach(function(i) {
                    value = page_list[i];
                    if (value._id[0] == '2'){
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else if (value._id[0] == '3'){
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else if  (value._id[0] == '4') {
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else {
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    }
                });
                page_number++;
            } else if (last_page) {
                $.range(page_number*10, page_list.length).forEach(function(i) {
                    value = page_list[i];
                    if (value._id[0] == '2'){
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else if (value._id[0] == '3'){
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else if  (value._id[0] == '4') {
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    } else {
                        $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                    }
                });
                last_page = false;
            }
        } else {
            page_number++;
            $.ajax({
                url: "meyorlar",
                type: 'get',
                data: {
                    selected: 'pagination',
                    page_number: page_number
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    $.each(response['kasb'], function(key, value) {
                        if (value._id[0] == '2'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if (value._id[0] == '3'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if  (value._id[0] == '4') {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        }
                    });
                },
                error: function(res){
                    console.log(res);
                }
            });
        }
    });

    $.extend({
        range:  function() {
            if (!arguments.length) { return []; }
            var min, max, step;
            if (arguments.length == 1) {
                min  = 0;
                max  = arguments[0]-1;
                step = 1;
            }
            else {
                // default step to 1 if it's zero or undefined
                min  = arguments[0];
                max  = arguments[1]-1;
                step = arguments[2] || 1;
            }
            // convert negative steps to positive and reverse min/max
            if (step < 0 && min >= max) {
                step *= -1;
                var tmp = min;
                min = max;
                max = tmp;
                min += ((max-min) % step);
            }
            var a = [];
            for (var i = min; i <= max; i += step) { a.push(i); }
            return a;
        }
    });

    $('input[type=search]').on('input', function(){
       clearTimeout(this.delay);
       this.delay = setTimeout(function(){
          $.ajax({
            url: "meyor_search",
            type: 'get',
            data: {
                search: this.value,
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                $('#id_basic').empty();
                page_list = response['kasb'];
                page_number = 1;
                n=0;

                $('#main2infoNum').text(response['kasb'].length);
		        $('#main2infoNum').text(response['kasb'].length);
                $.each(response['kasb'], function(key, value) {
                    if (n < 10) {
                        if (value._id[0] == '2'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Umumta\'lim fanlari</p><h2>'+value["name"]+'</h2><span>Professional ta\'lim muassasalari uchun</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if (value._id[0] == '3'){
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Kasb</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>Boshlang‘ich professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else if  (value._id[0] == '4') {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        } else {
                            $("#id_basic").append('<div class="col basic-items"><a href="kasb va mutaxasislik/'+value['id']+'" class="card"><div class="textbox"><p>Mutaxasislik</p><h2>'+value["_id"]+' - '+value["name"]+'</h2><span>O‘rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+value['img']+'" alt="Rasm topilmadi"></div></div></a></div>');
                        }
                        n++;
                    }
                });
            },
            error: function(res){
                console.log(res);
            }
          });
       }.bind(this), 500);
    });
})

