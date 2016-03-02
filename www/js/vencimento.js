function salvar(e) {
    e.preventDefault();
    $.post("https://warningbox-ripadua.c9users.io/vencimentos.json", $("#formVencimento").serializeArray()).done(function (data) {
        alert('Vencimento inserido com sucesso');
        window.location.href='../index.html';
    });
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
        quality: 50
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function accessCameraAlbum(e) {
	e.preventDefault(e);
    var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        quality: 50
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}