function listar() {
	$.get("http://warningbox-ripadua.c9users.io/avencer.json").done(function (msg) {
        var listview = $('#listview');
        listview.empty();
        for (var i = 0; i < msg.length; i++) {
		  listview.append('<li><img src="data:image/jpeg;base64,' + msg[i].imagem + '" /> <h4>' + msg[i].diferencaDeDias + ' dia(s) para vencer</h4></li>');
        }
		listview.listview('refresh');
    });
}