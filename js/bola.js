function Bola(pos, col, velocidadInicial, r){
	this.posicion = pos; 
	this.color = col; 
	this.velocidad = velocidadInicial; 
	this.aceleracion = 1.0; 
	this.radio = r; 
}

Bola.prototype.mover = function(){
	this.posicion[0] = this.posicion[0] + (this.aceleracion * this.velocidad[0]);
	this.posicion[1] = this.posicion[1] + (this.aceleracion * this.velocidad[1]);
}

Bola.prototype.cambiarVelocidad = function(nVelocidad){
	this.velocidad = nVelocidad; 
}

Bola.prototype.pintar = function(context){
	context.beginPath();
	context.strokeStyle = this.color;
	context.fillStyle = this.color;
	context.arc(this.posicion[0], this.posicion[1], this.radio, 0, 2 * Math.PI, true);
	context.stroke();
	context.fill();
}