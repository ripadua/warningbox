function salvar() {
    $.post("https://warningbox-ripadua.c9users.io/vencimentos.json", $("#formVencimento").serializeArray()).done(function (data) {
        alert('Vencimento inserida com sucesso');
        window.location.href='../index.html';
    });
}

function camSuccess(imgData) {
    $("#imagem").prop("src", "data:image/jpeg;base64," + imgData);
    $("#inputimagem").val(imgData);
    //alert(imageData);
    //var image = document.getElementById('imagem');
    //image.src = "data:image/jpeg;base64," + imgData;
}

function camError(error) {
	alert("erro ao capturar imagem");
}

function accessCamera() {
	var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.CAMERA,
        quality: 50
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}

function accessCameraAlbum() {
	var options = {
	    destinationType: Camera.DestinationType.DATA_URL,
	    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        quality: 50
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}