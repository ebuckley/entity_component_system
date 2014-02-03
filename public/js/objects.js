
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
var Selectable = {};
var AiMover = {};

/**
 * Subsytem updating, depends on stage for rendering
 * Each subsystem will init the object passed in by checking that it has the 
 * required properties and methods attached to it
 *
 * @param stage the easeljs drawing object
 */
var UpdateSubSystem = function( stage, subsystem, entity) {
	var addTo = function( subsytem, entity, cb) {
		// body...
	};
	var systems = {
		render: function (entity) {
			//object needs a position and an sprite
			if (typeof Renders[entity.name] === 'undefined') {
				//init render subsystem
				if (typeof entity.sprite === 'undefined') {
					entity.sprite = '/assets/tmp.png';
				}
				Renders[entity.name] = entity;
				entity.sprite = new createjs.Bitmap(entity.sprite);
				stage.addChild(entity.sprite);
			}
			return entity;
		},
		selectable: function (entity) {
		},
		aiMover: function(entity) {
		},
		keyboardMover: function (entity) {
			//object needs a position and an sprite
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
					entity.sprite.y -= 10;
				}, 'keydown');
				Mousetrap.bind('a', function() {
					entity.keyPressed('a');
					entity.sprite.x -= 10;
				}, 'keydown');
				Mousetrap.bind('s', function() {
					entity.keyPressed('s');
					entity.sprite.y += 10;
				}, 'keydown');
				Mousetrap.bind('d', function() {
					entity.keyPressed('d');
					entity.sprite.x += 10;
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

