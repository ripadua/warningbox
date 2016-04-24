function mostrarLista() {
    $('#divForm').hide();
	$('#divLista').show();
}

function mostrarForm() {
    $('#divForm').show();
	$('#divLista').hide();
}

function limparForm() {
    $("#formMarca").find("input[type=text]").val("");
}

function criar() {
    limparForm();
	mostrarForm();
}

function cancelar() {
    mostrarLista();
}

function carregar() {
	$.mobile.loading("show");
    $("#usuario_id").val(localStorage.usuario_id);
    $.get(localStorage.servidor + "/consultarEstabelecimentosPorUsuario?usuario=" + localStorage.email).done(function (msg) {
        if (msg.length == 0) {
            mostrarForm();
        } else {
            mostrarLista();
            $('#listview').empty();
            for (var i = 0; i < msg.length; i++) {
    		  $('#listview').append('<li><a href="#" onclick="selecionar(' + msg[i].id + ');">' + msg[i].nome + '</a></li>');
            }
    		$('#listview').listview('refresh');
        }
        $.mobile.loading("hide");
    }).fail(function(msg) {
        $.mobile.loading("hide");
        alert("Ocorreu um erro ao consultar os estabelecimentos. Por favor tente novamente.")
    });
}

function salvar() {
    $.mobile.loading("show");
    $.post(localStorage.servidor + '/estabelecimentos.json', $("#formEstabelecimento").serializeArray()).done(function (msg) {
        alert('Estabelecimento inserido com sucesso');
        localStorage.estabelecimento_id = msg.id; 
        window.location.href='estabelecimento.html';
    }).fail(function (msg) {
        $.mobile.loading("hide");
        alert('Ocorreu um erro ao incluir o estabelecimento. Por favor tente novamente.');
    });
}

function selecionar(estabelecimento_id) {
    localStorage.estabelecimento_id = estabelecimento_id;
    window.location.href = '../index.html';
}

