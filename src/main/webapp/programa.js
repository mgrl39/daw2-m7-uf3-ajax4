var xhr;

function busqueda(ev) {
	if ((ev.keyCode >= 48 && ev.keyCode <= 57) || 
(ev.keyCode >= 65 && ev.keyCode <= 90)) 
    {
		xhr = new XMLHttpRequest();		
		localizaPalabra();
	}
}
function localizaPalabra() {

	// recupera el texto introducido en el campo de texto 
    // y lo pasa como parámetro en la URL al servlet
	var caja = document.getElementById("texto");
	var texto = caja.value;
	xhr.open("GET", "Generador?texto=" + texto, true);
	xhr.onreadystatechange = procesadatos;
	xhr.send(null);
}


function procesadatos() {

	if (xhr.readyState == 4) {
		var resp = xhr.responseText;
		var caja = document.getElementById("texto");

		//si se ha recibido una palabra de respuesta
		//se introduce en el control y se seleccionan los
		//caracteres aún no tecleados
		if (resp != "") {
			var inicioSel = caja.value.length;
			caja.value = resp;
			sel(caja, inicioSel, caja.value.length);
		}
	}
}


// Función que lleva a cabo la selección
// parcial para la caja de texto
function sel(input, inicio, fin) {
	if (typeof document.selection != 'undefined' && document.selection) {
		tex = input.value;
		input.value = '';
		input.focus();
		var str = document.selection.createRange();
		input.value = tex;
		str.move('character', inicio);
		str.moveEnd("character", fin - inicio);
		str.select();
	}
	else if (typeof input.selectionStart != 'undefined') {
		input.setSelectionRange(inicio, fin);
		input.focus();
	}
}



