$(document).ready(function() {

    var base_dir = "/"

    var p_array = $('.p-array');
    var input_array = $('.inputSignup');
    var name = jQuery('input[name=fio]').val();
    var viloyat, tuman, muassasa, is_type, lavozim, tel, parol, code;

    $('#send').click(function() {
        name = jQuery('input[name=fio]').val();
        viloyat = $('select.select_viloyat').children("option:selected").val();
        tuman = $('select.select_tuman').children("option:selected").val();
        muassasa = jQuery('input[name=muassasa]').val();
        is_type = jQuery('input[name=check]:checked').val();
        lavozim = jQuery('input[name=lavozimi]').val();
        tel = $('#phone').val();
        parol = $('#passwordS').val();

        var arr = new Array(name, viloyat, tuman, muassasa, lavozim, tel, parol, is_type);

        if (parol.length >= 8) {
                $('#p-parol').hide();
        }

        if (name && viloyat && tuman && muassasa && is_type && lavozim && tel && parol.length>=8) {
            $.ajax({
                url: base_dir + "user",
                type: 'get',
                data: {
                    name: name,
                    tel: tel
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    if (response['is_name']) {
                        $('#is_name').show();
                        $(input_array[0]).css('border-color', 'red');
                    } else if (response['is_phone']) {
                        $('#is_phone').show();
                        $('#is_name').hide();
                        $(input_array[5]).css('border-color', 'red');
                    } else {
                        $('#is_name').hide();
                        $('#is_phone').hide();
                        code = response['code'];
                        $('#loginbox').hide();
                        $('.smsverification').css('display', 'flex');
                    }
                },
                error: function(res) {
                    console.log(res)
                }
            })
        } else {
            input_array.each(function(index) {
               if (!arr[index]) {
                    $(p_array[index]).show();
                    $(p_array[index]).css('color', 'red');
                    $(this).css('border-color', 'red');
               }
            });

            if (parol.length < 8) {
                $('#p-parol').show();
                $(input_array[6]).css('border-color', 'red');
            }
        }
    });

    $('#kodni-tasdiqlash').click(function() {
        $('#xato-kod').hide();
        var s = '';
        $('.code').each(function() {
            s += $(this).val();
        })

        if (s == code) {
            $.ajax({
                url: base_dir + "user/code",
                type: 'get',
                data: {
                    name: name,
                    viloyat: viloyat,
                    tuman: tuman,
                    muassasa: muassasa,
                    is_type: is_type,
                    lavozim: lavozim,
                    tel: tel,
                    parol: parol
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    if (response['res']) {
                        $('.smsverification').css('display', 'none');
                        $('#loginbox').css('display', 'flex');
                        $('#login').css('display', 'block');
                        $('#signup').css('display', 'none');
                    }
                }, error: function(res) {
                    console.log(res);
                },
            });
        } else {
            $('#xato-kod').css({'display': 'flex', 'color': 'red'});
        }
    });

    $('#kirish').click(function() {
        if (jQuery('input[name=telephone]').val()){
            $.ajax({
                    url: base_dir + "user/my-login",
                    type: 'get',
                    data: {
                        phone: jQuery('input[name=telephone]').val(),
                        password: jQuery('input[name=password]').val()
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        if (response['is_auth']) {
                            $('#loginbox').css('display', 'none');
                            window.location = "";
                        } else {
                            $('#tel').show();
                            $('#pass').show();
                        }
                    },
                    error: function(res) {}
            });
        }
    });

    $('select.select_viloyat').on('change', function() {
        $.ajax({
            url: base_dir + "user/video",
            type: 'get',
            data: {
                viloyat_id: $('select.select_viloyat').val(),
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                $('#tuman').empty();
                $.each(response['tum'], function(key, value) {
                     $('#tuman').append('<option value="'+value.id+'">'+value.name+'</option>')
                });
            },
            error: function(res){}
        });
    });

    $('#restartcode').click(function() {

    });


    $('.user-kirish').click(function() {
        $('#loginbox').css('display', 'flex');
        $('#login').css('display', 'block');
        $('#signup').css('display', 'none');
    });

    $('#id_muhokama').click(function() {
        if ($('#w3review').val()) {
            $.ajax({
                url: base_dir+'user/user-muhokama',
                type: 'get',
                data: {
                    text: $('#w3review').val(),
                    title: $('#muhokama_name').text(),
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    if (response['res']){
                        $('#w3review').val('');
                        alert('Sizning fikringiz yetkazildi!!!');
                    } else {
                        alert('Kechirasiz, Izohingiz yuborilishida muammo yuz berdi!\nIltimos boshqatdan urinib ko\'ring');
                    }
                },
                error: function(res){
                    console.log(res);
                }
            })
        } else {
            alert('Izoh kiriting!!!');
        }
    });
})

