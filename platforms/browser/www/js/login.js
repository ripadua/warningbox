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
    	if(localStorage.email != undefined) {
    		$("#email").val(localStorage.email);
    		localStorage.email = "";
    	}

        console.log('Received Event: ' + id);
        var push = PushNotification.init({
            android: {
                senderID: "1016161579638"
            }
        });

        console.log('depois do init');

        push.on('registration', function(data) {
            localStorage.registrationid = data.registrationId;
            console.log(data.registrationId);
        });

        push.on('notification', function(data) {
            
        });

        push.on('error', function(e) {
            console.log(e.message);
        });
    }
};

function entrar(e) {
	e.preventDefault();
    $("#inputIdPush").val(localStorage.registrationid);
    var email = $("#email").val();
	if (email == undefined || email == "") {
		alert('Insira o seu endereço de e-mail para entrar.');
	} else {
		$.mobile.loading("show");
		$.get("http://warningbox-ripadua.c9users.io/consultarUsuarioPorEmail?email=" + email).done(function (msg) {
			if (msg == '0') {
				if (confirm('O e-mail informado não foi encontrado na base de dados. Clique "OK" para confirmar o cadastro.')) {
					$.post("http://warningbox-ripadua.c9users.io/usuarios.json", $("#formlogin").serializeArray()).done(function (msg) {
						alert("E-mail registrado com sucesso.");
						localStorage.usuario_id = msg.id;
						localStorage.email = email;
						window.location.href='paginas/estabelecimento.html';
					}).fail(function (msg) {
						$.mobile.loading("hide");
						alert("Ocorreu um erro ao registrar o e-mail. Tente novamente.");
					});
				} else {
					alert('Cadastro cancelado.')
				}
			} else {
				localStorage.email = email;
				localStorage.usuario_id = msg;
				window.location.href='paginas/estabelecimento.html';
			};
			$.mobile.loading("hide");
		}).fail(function (msg) {
			$.mobile.loading("hide");
			alert('Sem conexão com a internet. Por favor conecte ao 3G ou Wi-Fi e tente novamente.');
		});
	}
}
