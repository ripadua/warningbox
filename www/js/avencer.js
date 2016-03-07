function listar() {
	$(document).ready(function() {
		$.mobile.loading("show");
		var estabelecimento_id = localStorage.estabelecimento_id;
		$.get("http://warningbox-ripadua.c9users.io/avencer.json?estabelecimento_id=" + estabelecimento_id).done(function (msg) {
	        var listview = $('#listview');
	        listview.empty();
	        if (msg.length == 0) {
	            $("#nenhumvencido").show();
	        } else {
	            $("#nenhumvencido").hide();
		        for (var i = 0; i < msg.length; i++) {
				  listview.append('<li><img src="data:image/jpeg;base64,' + msg[i].imagem + '" /> <h4>' + msg[i].diferencaDeDias + ' dia(s) para vencer</h4></li>');
		        }
		    }
			listview.listview('refresh');
			$.mobile.loading("hide");
	    }).fail(function(msg) {
	    	alert("Ocorreu um erro ao listar os produtos a vencer. Por favor tente novamente.");
	    	$.mobile.loading("hide");
	    });
	});
}

function criar(e) {
	e.preventDefault();
	window.location.href='vencimento.html';
}