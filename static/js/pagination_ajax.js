
$(document).ready(function() {
    $('.news_pag').click(function(event){
		// preventing default actions

//		$(this).addClass('active');
        $('.news_pag').each(function(i){
            $(this).removeClass('active');
        });

        $(this).addClass('active');

		event.preventDefault();
		var page_no = $(this).text();
		// ajax call
			$.ajax({
					type: "get",
					// define url name
					url: "",
					data : {
					page_no : page_no,
//					csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
				},
				// handle a successful response
				success: function (response) {
					$('.min_news').empty();
					$.each(response['results'], function(i, val) {
					 //append to post
					$('.min_news').append('<div class="new"><span>'+val.date+'</span><a href="news/'+val.id+'">'+val.text+'</a><a href="news/'+val.id+'" class="a"> <img src="media/'+val.img+'" alt="messi"></a><p>'+val.description+'</p></div>')
				   });
				},
				error: function () {
					alert('Error Occured');
				}
			});
	});
})
