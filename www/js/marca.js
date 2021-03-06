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

function listar() {
	$.get(localStorage.servidor + "/marcas.json").done(function (msg) {
        $('#listviewMarcas').empty();
        for (var i = 0; i < msg.length; i++) {
		  $('#listviewMarcas').append('<li>' + msg[i].nomeMarca + '</li>');
        }
		$('#listviewMarcas').listview('refresh');
    });
}

function salvar() {
    $.post(localStorage.servidor + '/marcas.json', $("#formMarca").serializeArray()).done(function (data) {
        listar();
        mostrarLista();
        alert('Marca inserida com sucesso');
    });
}

