
var City = {
	images: ['assets/backgrounds.png'],
	frames: [
		//x,y,w,h,index,regX,regY
		[0,0,231, 63],
	]
};
var Green = {
	framerate: 20,
	images: ['/assets/backrounds.png'],
	frames: [
		//x,y,w,h,index,regX,regY
		[0,231,231,63],
	]
};
var Game = function ( canvas_element ) {

	//easeljs stage
	var stage;
	var entities;

	/**
	 * Global update 
	 */
	var update = function () {
		UpdateEntities( entities );
		stage.update();
	};

	var constructor = function () {
		console.log('Game engine started!');

		stage = new createjs.Stage(canvas_element);
		/*
		 * get connection to server
		 */
		var socket = io.connect();

		socket.on('game:entities', function(data) {
			console.log('game:entities');
			entities = data.entities;
			// instantiate the new objects
			_(entities).map(function( entity ) {
				return GameObject(entity);
			});
		});


		/*
		//load a spritesheet
		var spritesheet = new createjs.SpriteSheet(City);
		var sprite = new createjs.Sprite(spritesheet);
		console.log(sprite);
		sprite.x = 100;
		sprite.y = 100;
		sprite.width = 1000;
		stage.addChild(sprite);
		createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', stage);
        */
		setInterval(function() {
			update();
		}, 1000/10);
	};
	constructor();
};