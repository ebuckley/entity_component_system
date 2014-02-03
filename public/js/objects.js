// Parse an entitiy into a game objects,
// attaches methods and objects to the entities data
var GameObject = function ( object ) {
	var gameObject = {};
	gameObject = object; 
	_(object.subs).each(function(item) {
		// initialize each of the subsystems
		gameObject = SubSystem[item](object);
	});
	return gameObject;
};

/**
 * Update a list of entities
 */
var	UpdateEntities = function ( entities ) {
	return _(entities).map(function( ent ) {
		return GameObject(ent);
	});
};
/**
 * These are the subsystem objects, each game object is accessible by name
 */
var Renders = {};
var KeyboardMovers = {};

// Each subsystem will init the object passed in by checking that it has the 
// required properties and methods attached to it
var SubSystem = {
	render: function (entity) {
		//object needs a position and an image
		if (typeof Renders[entity.name] === 'undefined') {
			//init render subsystem
			if (typeof entity.image === 'undefined') {
				entity.image = '/assets/tmp.png';
			}
			Renders[entity.name] = entity;
			entity.image = new createjs.Bitmap(entity.image);
		}
		return entity;
	},
	keyboardMover: function(entity) {
		//object needs a position and an image
		if (typeof KeyboardMovers[entity.name] === 'undefined') {
			//init keyboard subsystem
			KeyboardMovers[entity.name] = entity;
			Mousetrap.bind('w', function() {
				entity.position.y -= 10;
			}, 'keyup');
			Mousetrap.bind('a', function() {
				entity.position.x -= 10;
			}, 'keyup');
			Mousetrap.bind('s', function() {
				entity.position.y += 10;
			}, 'keyup');
			Mousetrap.bind('d', function() {
				entity.position.x += 10;
			}, 'keyup');
		}
	}
};