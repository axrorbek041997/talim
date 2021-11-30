$(document).ready(function() {
    var page_list = [];
    var page_number = 1;
    var last_page=true;

    $('.btnLeft').click(function() {
        page_number = 1
        last_page = true;

        $.ajax({
            url: 'muhokama',
            type: 'get',
            data: {
                selected: $(this).val()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                $('#id_basic').empty();

                page_list = response['muhokama'];

                var n=0;
                $.each(response['muhokama'], function(key, v) {
                    if (n < 10) {
                        if (v._id[0] == '3') {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Kasb</p><h2>'+v._id+' - '+v.name+'</h2><span>Boshlang‘ich professional ta’lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        } else if (v._id[0] == '4') {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        }
                        n++;
                    }
                })

                $('#main2infoNum').text(response['muhokama'].length);
            },
            error: function(res) {
                alert(res);
            }
        });
    });

    $('#muhokoma-button').click(function(e) {
        if (page_list.length != 0){
            if (page_list.length >= (page_number+1)*10) {
                $.range(page_number*10, (page_number+1)*10, 1).forEach(function(i) {
                    v = page_list[i];
                    if (v._id[0] == '3') {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Kasb</p><h2>'+v._id+' - '+v.name+'</h2><span>Boshlang‘ich professional ta’lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    } else if (v._id[0] == '4') {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    } else {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    }
                });
                page_number++;
            } else if (last_page) {
                $.range(page_number*10, page_list.length).forEach(function(i) {
                    value = page_list[i];
                    if (v._id[0] == '3') {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Kasb</p><h2>'+v._id+' - '+v.name+'</h2><span>Boshlang‘ich professional ta’lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    } else if (v._id[0] == '4') {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    } else {
                        $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                    }
                });
                last_page = false;
            }
        }
        else {
            page_number++;
            $.ajax({
                url: 'muhokama',
                type: 'get',
                data: {
                    selected: 'pagination',
                    page_number: page_number
                },
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function(response) {
                    $.each(response['muhokama'], function(key, v) {
                        if (v._id[0] == '3') {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Kasb</p><h2>'+v._id+' - '+v.name+'</h2><span>Boshlang‘ich professional ta’lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        } else if (v._id[0] == '4') {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        } else {
                            $('#id_basic').append('<div class="col"><a href="muhokama/'+v.id+'" class="card" id="talim"><div class="textbox"><p>Mutaxasislik</p><h2>'+v._id+' - '+v.name+'</h2><span>O\'rta-maxsus professional ta\'lim</span></div><div class="imgbox"><div><img src="media/'+v.img+'" alt=""></div></div></a></div>');
                        }
                    })
                },
                error: function(res) {
                    console.log(res);
                },
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
});
