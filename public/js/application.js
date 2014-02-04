
var City = {
	images: ['assets/backgrounds.png'],
	frames: [
		//x,y,w,h,index,regX,regY
		[0,0,231, 63],
	]
};
var Green = {
	framerate: 20,
	images: ['/assets/backgrounds.png'],
	frames: [
		//x,y,w,h,index,regX,regY
		[0,231,231,63],
	]
};
var Game = function ( canvas_element ) {

	//easeljs stage
	var stage;
	var textures;
	var entities;

	/**
	 * Global update 
	 */
	var update = function () {
		//pass the stage to update entitites so render subsystem can draw
		UpdateEntities( entities, stage, textures);
		stage.update();
	};

	var constructor = function () {
		console.log('Game engine started!');

		stage = new createjs.Stage(canvas_element);

		// load the game
		var socket = io.connect();
		socket.on('game:load', function(data) {
			console.log('game:load');
			entities = data.entities.entities;
			// load textures
			textures = new createjs.LoadQueue();
			textures.on('complete', loadingHasFinished);
			textures.loadManifest(data.textures.textures);
		});
		
		var loadingHasFinished = function () {
			console.log('image loading has completed!');
			setInterval(function() {
				update();
			}, 1000/10);
		};
	};

	constructor();
};