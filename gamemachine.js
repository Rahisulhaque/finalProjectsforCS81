var snakegame = {
	canvasWidth : 800,
	canvasHeight : 600,
	pixelSize : 40,
	
	KEY_MAPPING : {
		39 : "right",
		40 : "down",
		37 : "left",
		38 : "up"
	},

	started : true,
	attributes : {},

	gameHeight : function(){
		return this.attributes.gameHeight || (this.attributes.gameHeight = this.canvasHeight / this.pixelSize);
	},

	gameWidth : function(){
		return this.attributes.gameWidth || (this.attributes.gameWidth = this.canvasWidth / this.pixelSize);
	},

	canvas : function(){
		if(snakegame.context) { return  snakegame.context;}
		var canvas = document.getElementById("snake-game");
		snakegame.context = canvas.getContext('2D');
		return snakegame.context;
	},

	executeTimePerSecond : function(tickCallBack, gameSpeed){
		tickCallBack();
		snakegame.processID = setInterval(function(){
			tickCallBack();
			}, 1000 / gameSpeed);
	},

	onArrowkey: function(callback){
		document.addEventListener('keydown', function(e){
			if (snakegame.KEY_MAPPING[e.which])
			{
				e.preventDefault();
				callback(snakegame.KEY_MAPPING[e.which]);
			}
			
		});
	},
	endGame : function(){
		this.started = false;
		clearInterval(snakegame.processID);
	},

	draw: function(objects){
		if(this.started){
			snakegame.clear;
			snakegame.drawObjects(objects);
		}
	},

	clear :function()

	drawObjects:function(objects)


}