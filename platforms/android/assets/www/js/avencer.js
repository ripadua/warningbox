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
				  var novoproduto = 
                    '<li produto="' + msg[i].id + '">' +
                        '<a href="#">' +
                            '<img src="data:image/jpeg;base64,' + msg[i].imagem + '" />' +
                            '<h4>' + msg[i].diferencaDeDias + ' dia(s) para vencer</h4>' +
                        '</a>' +
                        '<a href="#" onclick="remover(event)">Remover produto</a>' +
                    '</li>';
				  listview.append(novoproduto);
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

function remover(e) {
    e.preventDefault();
    if (confirm('O produto será removido da base de dados. Confirma remoção do produto?')) {
        var idProduto = e.target.parentElement.getAttribute('produto');
        var elem = e.target.parentElement;
        elem.parentNode.removeChild(elem);
        $.ajax({
            url: 'http://warningbox-ripadua.c9users.io/vencimentos/' + idProduto + '.json',
            type: 'DELETE',
            success: function(result) {
                alert('Produto removido com sucesso.');
                window.location.href='avencer.html';
            },
            fail: function(result) {
                alert('Ocorreu um erro ao excluir o produto. Tente novamente');
            }
        });
    } else {

    }

}