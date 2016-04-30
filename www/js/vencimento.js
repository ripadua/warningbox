function salvar(e) {
    e.preventDefault();

    var passouValidacao = true;

    var imagem = $("#inputimagem").val();
    if (imagem == undefined || imagem == "") {
    	alert('Por favor insira uma imagem do produto.');	
        passouValidacao = false;
    }

    var data = $("#data").val();
    if (data == undefined || data == "") {
    	alert('Por favor informe a data de vencimento do produto.');
        passouValidacao = false;
    }

    if (passouValidacao) {
        $.mobile.loading("show");
        $.post(localStorage.servidor + "/vencimentos.json", $("#formVencimento").serializeArray()).done(function (data) {
            alert('Produto inserido com sucesso');
            var paginaDestino = "";
            if (new Date(data) > new Date()) {
                paginaDestino = 'avencer.html';
            } else {
                paginaDestino = '../index.html';
            }
            window.location.href= paginaDestino;
        }).fail(function (msg) {
            alert('Ocorreu um erro ao salvar o produto. Por favor tente novamente.');
            $.mobile.loading("hide");
        });
    }
}

function camSuccess(imgData) {
    $("#imagem").prop("src", "data:image/jpeg;base64," + imgData);
    $("#inputimagem").val(imgData);
}

function camError(error) {
	alert("erro ao capturar imagem");
}

function accessCamera(e) {
	e.preventDefault();
    var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.CAMERA,
        quality: 50,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        targetWidth: 300,
        targetHeight: 300
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function accessCameraAlbum(e) {
	e.preventDefault(e);
    var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        quality: 50,
        correctOrientation: true,
        targetWidth: 300,
        targetHeight: 300
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function carregar() {
    $(document).ready(function() {
        $("#estabelecimento").val(localStorage.estabelecimento_id);
    });
}