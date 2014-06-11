$(document).ready(function() {
	
	var lienzo;
	var context;

	var bola;
	var raqI;
	var raqD;
	
	var reloj; 
	var rebotes; 

	function pintarTablero() {
		// Limpiamos el tablero
		context.clearRect(0, 0, lienzo.width, lienzo.height);

		// Pintamos el tablero
		context.fillStyle = "#000000";
		context.fillRect(0, 0, lienzo.width, lienzo.height);
		context.fill();
		
		// Pintamos las lineas blancas
		context.beginPath();
		for (var x = 8; x <= lienzo.width; x +=292) {
			context.moveTo(x, 0);
			context.lineTo(x, lienzo.width);
		}
		context.strokeStyle = "#ffffff";
		context.stroke();
		
		// Pintamos la bola
		bola.pintar(context);
		
		// Pintamos las raquetas
		raqI.pintar(context); 
		raqD.pintar(context); 
		
		// Pintamos los rebotes 
		context.font = '18px "Consolas"';
		context.fillStyle = "red";
		context.fillText("Rebotes: " + rebotes, 20, 20);
	}

	// Inicializa la bola en el centro del campo con sus valores iniciales
	function crearBola(){
		var posicion_x = Math.floor(lienzo.width / 2);
		var posicion_y = Math.floor(lienzo.height / 2);
		bola = new Bola([posicion_x,posicion_y], "#ffffff", [0,0], 20);
	}

	// Inicializa las dos raquetas en la posici�n (0,200) y (592,200). 
	function crearRaquetas(){
		var posicion_y = Math.floor(lienzo.height / 2);
		raqI = new Raqueta(0,posicion_y);
		raqD = new Raqueta(592,posicion_y)
	}
	
	function actualizar(){
		if (colision(0,400,1)){
			bola.cambiarVelocidad([bola.velocidad[0], (bola.velocidad[1] * (-1))]);
			bola.mover(); 
			pintarTablero();
		}
		else if (((bola.posicion[1] < raqI.posY + 48)&&(bola.posicion[1] > raqI.posY - 48)&& colisionRaqueta(8)) || ((bola.posicion[1] < raqD.posY + 48)&&(bola.posicion[1] > raqD.posY - 48)&& colisionRaqueta(592))) {
			bola.cambiarVelocidad([(bola.velocidad[0] * (-1)), bola.velocidad[1]]);
			rebotes++; 
			bola.mover(); 
			pintarTablero();
		}
		else if (colision(0,600,0)){
			clearInterval(reloj);
			guardarRecord();
			iniciarPong();
		}
		else {
			bola.mover(); 
			pintarTablero();
		}
	}
	
	function colision(limiteSup, limiteInf, eje){
		if (((bola.posicion[eje] - bola.radio) <= limiteSup) || ((bola.posicion[eje] + bola.radio) >= limiteInf)){
			return true; 
		}	
		else {
			return false; 
		}
	}
	
	function colisionRaqueta(limite){
		if (limite == 8){
			if ((bola.posicion[0] - bola.radio) <= limite) {
				return true; 
			}	
			else {
				return false; 
			}
		}	
		else if (limite == 592){
			if ((bola.posicion[0] + bola.radio) >= limite) {
				return true; 
			}	
			else {
				return false; 
			}
		}	
	}
	
	// Gestion de teclas pulsadas. 
	$(document).keydown(function(e) {
		switch(e.which) {
		
			/* Para la bola */ 
			case 37: // Flecha izquierda
			bola.cambiarVelocidad([bola.velocidad[0]-1,bola.velocidad[1]]);
			break;

			case 38: // Flecha arriba
			bola.cambiarVelocidad([bola.velocidad[0],bola.velocidad[1]-1]);
			break;

			case 39: // Flecha derecha
			bola.cambiarVelocidad([bola.velocidad[0]+1,bola.velocidad[1]]);
			break;

			case 40: // Flecha abajo
			bola.cambiarVelocidad([bola.velocidad[0],bola.velocidad[1]+1]);
			break;
			
			/* Para las raquetas */
			case 65: // Tecla A	
			if (raqI.velocidad <= -1) raqI.incVelocidad(-1); 
			if ((raqI.posY + 48 + raqI.velocidad) <= 400) raqI.mover();
			break;

			case 76: // Tecla L
			if (raqD.velocidad <= -1) raqD.incVelocidad(-1); 
			if ((raqD.posY + 48 + raqD.velocidad) <= 400) raqD.mover();
			break;

			case 80: // Tecla P
			if (raqD.velocidad >= 1) raqD.incVelocidad(-1); 
			if ((raqD.posY - 48 + raqD.velocidad) >= 0) raqD.mover();
			break;

			case 81: // Tecla Q
			if (raqI.velocidad >= 1) raqI.incVelocidad(-1); 
			if ((raqI.posY - 48 + raqI.velocidad) >= 0) raqI.mover();
			break;

			default: 
			return; // En caso de pulsar otra tecla, salimos
		}
		e.preventDefault(); 
	});
	
	function guardarRecord(){
		if (localStorage.getItem("rebotes_pong")==null){
			alert("Game over. Se ha obtenido un nuevo record de " + rebotes + " rebotes."); 
			console.log("No existe dicha variable en el localstorage, porque es la primera vez que se juega."); 
			console.log("Guardamos los rebotes obtenidos."); 
			localStorage.setItem("rebotes_pong", rebotes);  
		}
		else {
			var record = parseInt(localStorage.getItem("rebotes_pong"));
			if (record < rebotes){
				alert("Game over. Se ha obtenido un nuevo record de " + rebotes + " rebotes."); 
				console.log("Los rebotes conseguidos son mayores que los guardados en el localstorage."); 
				console.log("Guardamos los rebotes obtenidos."); 
				localStorage.setItem("rebotes_pong", rebotes);
			}
			else {
				alert("Game over. Se ha obtenido un total de " + rebotes + " rebotes."); 
				console.log("Los rebotes conseguidos son menores o iguales que los guardados en el localstorage."); 
				console.log("Mantenemos los del localstorage y no actualizamos."); 
			}
		}
	}

	function iniciarPong(){
		lienzo = document.getElementById("lienzo");
		context = lienzo.getContext("2d");
		crearBola();
		crearRaquetas(); 
		rebotes = 0; 
		pintarTablero();
		reloj = setInterval(actualizar, 60);
	}

	iniciarPong();
	
});
