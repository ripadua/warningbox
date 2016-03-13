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
        $.post("https://warningbox-ripadua.c9users.io/vencimentos.json", $("#formVencimento").serializeArray()).done(function (data) {
            alert('Vencimento inserido com sucesso');
            window.location.href='../index.html';
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
        quality: 25,
        correctOrientation: true,
        saveToPhotoAlbum: true
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function accessCameraAlbum(e) {
	e.preventDefault(e);
    var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        quality: 25,
        correctOrientation: true
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function carregar() {
    $(document).ready(function() {
        $("#estabelecimento").val(localStorage.estabelecimento_id);
    });
}