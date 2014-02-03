
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
		//pass the stage to update entitites so render subsystem can draw
		UpdateEntities( entities, stage);
		stage.update();
	};

	var constructor = function () {
		console.log('Game engine started!');

		stage = new createjs.Stage(canvas_element);
		/*
		 * TOOD this could be moved out of here into network code
		 * get connection to server
		 */
		var socket = io.connect();
		socket.on('game:entities', function(data) {
			console.log('game:entities');
			entities = data.entities;
		});

		setInterval(function() {
			update();
		}, 1000/10);
	};
	constructor();
};