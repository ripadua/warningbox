function salvar() {
    alert('Vencimento inserido com sucesso!');
    window.location.href='../index.html';
}

function camSuccess(imgData) {
	$("#imagem").attr("src", imgData);
}

function camError(error) {
	alert("erro ao capturar imagem");
}

function accessCamera() {
	var options = {
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType: Camera.PictureSourceType.CAMERA
	}
	navigator.camera.getPicture(camSuccess, camError, options);
}