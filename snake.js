var draw = function(snakeToDraw, apple)
	{
		
		var drawableSnake = { color: "green", pixels: snakeToDraw};
		var drawableapple = { color: "red", pixels: [apple]};
		var drawableObjects =[drawableSnake, drawableapple];

		CHUNK.draw(drawableObjects); 
	}

var moveSegment = function(segment){
	if (segment.direction === "down"){
		return{ top :segment.top +1, left :segment.left}
	}else if (segment.direction === "up"){
		return{ top :segment.top -1, left :segment.left}
	}else if (segment.direction === "right"){
		return{ top :segment.top , left :segment.left+1}
	}else if (segment.direction === "left"){
		return{ top :segment.top, left :segment.left-1}
	}
	return segment;
}
var segmnetFurtherForwardThan = function(index, snake){
	
	return snake[index -1] || snake[index];
	
}

var moveSnake = function(snake){

	return snake.map(function(oldSegment,segmentIndex){
	var newSegment = moveSegment(oldSegment);
	newSegment.direction = segmnetFurtherForwardThan(segmentIndex,snake).direction;
	return newSegment;
	});
}

var growSnake = function(snake){
	var indexOfLastSegment = snake.length -1;
	var lastSegment = snake[indexOfLastSegment];
	snake.push({ top:lastSegment.top, left :lastSegment.left});
	return snake;
}

var ate= function(sanke,otherthing){
	var head = sanke[0];
	return CHUNK.detectCollisionBetween([head], otherthing)
}
var advanceGame = function(){
	var newSnake = moveSnake(snake);

	if (ate(newSnake, snake)){
		CHUNK.endgame();
		CHUNK.flashMessage("WOOOO! You ate yourself!");
	}
	if (ate(newSnake,[apple])){
		newSnake = growSnake(newSnake);
		apple = CHUNK.randomLocation();
	}
	

	if (ate(newSnake, CHUNK.gameBoundaries())){
		CHUNK.endGame();
		CHUNK.flashMessage("Sorry! You've hit the wall");
	}
	snake =newSnake;
	draw(snake,apple);
}

var changeDirection = function(direction){
	snake[0].direction = direction;
}

var apple= {top: 8,left: 10};
var snake = [{top:1, left: 0, direction: "down"}, {top :0,left:0,direction:"down"}];

CHUNK.executeNTimesPerSecond(advanceGame,1);
CHUNK.onArrowKey(changeDirection);




