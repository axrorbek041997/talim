$(document).ready(function(e) {
    $('#myBtn').click(function() {
        if ($('#fname').val().length != 0) {
            $('#fname').css('border-color', 'gray')
            $('#spinner').css('display', 'block');
            $('#myModal').css('display', 'none');
            clearTimeout(this.delay);
            this.delay = setTimeout(function(){
                $.ajax({
                    url: 'guvohnomalar',
                    type: 'get',
                    data: {
                        number: $('#fname').val()
                    },
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    success: function(response) {
                        if (response['guvohnoma'].length != 0) {
                            v = response['guvohnoma'];
                            $('#myModal').empty();
                            $('#myModal').append('<div class="col"><h1 style="padding:0px 0 12px;">Guvohnoma</h1><div class="card3"><div class="imgbox"><a href="#"><img src="media/'+v.guv_img+'" alt=""></a></div><div class="textbox1"><p>Guvohnoma raqaqmi: <b> № '+v.guv_nomer+' </b></p><p> Berilgan sanasi:<b> '+v.date+'</b></p><p>Mualliflar:<b> '+v.guv_muall+'</b></p></div></div></div>');
                            if (response['tur'] == 'material') {
                                $('#myModal').append('<div class="col"><h1 style="padding:90px 0 12px;">O‘quv Material</h1><div class="card1"><div class="textbox"><p>O‘quv material</p><h2>'+v.name+'</h2><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="">Yuklab olish</a></div><div class="imgbox"><a href="/o\'qitish materiallari/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                            } else if (response['tur'] == 'qullanma'){
                                $('#myModal').append('<div class="col"><h1 style="padding:90px 0 12px;">O‘quv qo‘llanmalar</h1><div class="card1"><div class="textbox"><p>O‘quv qo‘llanma</p><h2>'+v.name+'</h2><a href="media/'+v.prof_stand+'" target="_blank" class="download"> <img src="static/icons/Arrow - Down.svg" alt="">Yuklab olish</a></div><div class="imgbox"><a href="/o\'quv qo\'llanma/'+v.id+'"><img src="media/'+v.img+'" alt=""></a></div></div></div>');
                            }
                            $('#spinner').css('display', 'none');
                            $('#myModal').css('display', 'block');
                        } else {
                            $('#spinner').css('display', 'none');
                            alert('Topilmadi!!!');
                        }
                    },
                    error: function(res) {
                        console.log(res);
                    },
                });
            }.bind(this), 2000);
        } else {
            $('#fname').css('border-color', 'red')
        }
    });
});