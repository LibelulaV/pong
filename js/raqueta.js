function Raqueta(x, y){
	this.posX = x;  
	this.posY = y;
	this.velocidad = 1; // Velocidad vertical. 
}

Raqueta.prototype.mover = function(){
	//this.posX = this.posX + this.velocidad; // Solo se mueve en el eje Y. 
	this.posY = this.posY + this.velocidad;
}

Raqueta.prototype.incVelocidad = function(vel){ // Incrementa la velocidad en vel. 
	this.velocidad = this.velocidad * vel; 
}

Raqueta.prototype.pintar = function(context){
	context.strokeStyle = "#ffffff";
	context.fillStyle = "#ffffff";
	context.lineWidth = 8;
	context.beginPath();
	context.fillRect(this.posX, this.posY - 48, 8, 96);
	context.stroke();
	context.fill();
	context.lineWidth = 1;
}