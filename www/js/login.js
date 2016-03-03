var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

function entrar(e) {
	e.preventDefault();
	var email = $("#email").val();
	if (email == undefined || email == "") {
		alert('Insira o seu endereço de e-mail para entrar.');
	} else {
		$.get("http://warningbox-ripadua.c9users.io/consultarPorEmail?email=" + email).done(function (msg) {
			if (msg == '0') {
				if (confirm('O e-mail informado não foi encontrado na base de dados. Clique "OK" para confirmar o cadastro.')) {
					$.post("http://warningbox-ripadua.c9users.io/usuarios", $("#email").serialize()).done(function (msg) {
						alert("E-mail registrado com sucesso.");
						localStorage.email = email;
						window.location.href='index.html';
					}).fail(function (msg) {
						alert("Ocorreu um erro ao registrar o e-mail. Tente novamente.");
					});
				} else {
					alert('Cadastro cancelado.')
				}
			} else if (msg == '1') {
				alert('Teste');
			}
		});
	}
}

function listar() {
	$.get("http://warningbox-ripadua.c9users.io/vencidos.json").done(function (msg) {
        var listview = $('#listview');
        listview.empty();
        for (var i = 0; i < msg.length; i++) {
		  listview.append('<li><img src="data:image/jpeg;base64,' + msg[i].imagem + '" /> <h4>' + (msg[i].diferencaDeDias * -1) + ' dia(s) vencido</h4></li>');
        }
		listview.listview('refresh');
    });
}
