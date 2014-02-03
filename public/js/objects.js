
//update a game object! runs all component subscriptions
// @param stage is the dependency injected drawing layer (easeljs)
var GameObject = function ( object, stage ) {
	var gameObject = {};
	gameObject = object; 
	_(gameObject.subs).each(function(subsystem) {
		// initialize each of the subsystems
		gameObject = UpdateSubSystem(stage, subsystem, gameObject);
	});
	return gameObject;
};

/**
 * Update a list of entities
 * depends on stage, easeljs drawing layer
 */
var	UpdateEntities = function ( entities, stage ) {
	return _(entities).map(function( ent ) {
		return GameObject(ent, stage);
	});
};
/**
 * These are the subsystem objects, each game object is accessible by name
 */
var Renders = {};
var KeyboardMovers = {};

/**
 * Subsytem updating, depends on stage for rendering
 * Each subsystem will init the object passed in by checking that it has the 
 * required properties and methods attached to it
 *
 * @param stage the easeljs drawing object
 */
var UpdateSubSystem = function( stage, subsystem, entity) {
	var systems = {
		render: function (entity) {
			//object needs a position and an image
			if (typeof Renders[entity.name] === 'undefined') {
				//init render subsystem
				if (typeof entity.image === 'undefined') {
					entity.image = '/assets/tmp.png';
				}
				Renders[entity.name] = entity;
				entity.image = new createjs.Bitmap(entity.image);
				stage.addChild(entity.image);
			}
			return entity;
		},
		keyboardMover: function(entity) {
			//object needs a position and an image
			if (typeof KeyboardMovers[entity.name] === 'undefined') {
				//init keyboard subsystem in this block

				KeyboardMovers[entity.name] = entity;
				//attach keyPreseed event for all bindings
				entity.keyPressed = function( key ) {
					console.log(entity.name + ' : ' + key +  ' pressed');

				};
				//setup individual keypressed events
				Mousetrap.bind('w', function() {
					entity.keyPressed('w');
					entity.image.y -= 10;
				}, 'keydown');
				Mousetrap.bind('a', function() {
					entity.keyPressed('a');
					entity.image.x -= 10;
				}, 'keydown');
				Mousetrap.bind('s', function() {
					entity.keyPressed('s');
					entity.image.y += 10;
				}, 'keydown');
				Mousetrap.bind('d', function() {
					entity.keyPressed('d');
					entity.image.x += 10;
				}, 'keydown');

			}
			return entity;
		}
	};

	if (systems[subsystem] === 'undefined') {
		throw new Error('undefined subsystem, implement it in systems');
	}
	return systems[subsystem](entity);
};

