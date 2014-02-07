
/**
 * These are the subsystem objects, each game object is accessible by name
 * as a property on the object.
 */
var Renders = {};
var KeyboardMovers = {};
var Selectables = {};
var AiMovers = {};

/**
 * Update a list of entities
 * depends on stage, easeljs drawing layer
 */
var	UpdateEntities = function ( entities, stage, textures ) {

	//update a game object! runs all component subscriptions
	//@param object the entity model
	var UpdateGameObject = function ( object ) {
		var gameObject = {};
		gameObject = object;
		_(gameObject.subs).each(function(subsystem) {
			// initialize each of the subsystems
			gameObject = UpdateSubSystem(subsystem, gameObject);
		});
		return gameObject;
	};

	/**
	 * Subsytem updating, depends on stage for rendering
	 * Each subsystem will init the object passed in by checking that it has the 
	 * required properties and methods attached to it
	 *
	 * @param stage the easeljs drawing object
	 * @param entity the model for an entity object
	 * @param textures the LoadQueue for textures
	 */
	var UpdateSubSystem = function( subsystem, entity) {

		//Graphics for the selection of this object;
		var g = new createjs.Graphics();
		g.setStrokeStyle(1);
		g.beginStroke(createjs.Graphics.getRGB(255,0,0));
		g.drawRect(0, 0, 64, 64);	

		var init = function(sysName, entity, cb) {
			if (typeof sysName[entity.name] === 'undefined') {
				return cb();
			}
			return entity;
		};
		var systems = {
			render: function (entity) {
				//object needs a position and an sprite
				if (typeof Renders[entity.name] === 'undefined') {
					//init render subsystem
					Renders[entity.name] = entity;
					entity.image = new createjs.Bitmap(textures.getResult(entity.sprite));
					if (entity.image === null) {
						throw new Error('sprite not found ' + entity.sprite);
					}
					stage.addChild(entity.image);
				}
				return entity;
			},
			selectable: function (entity) {
				if (_.contains(entity.subs, 'render')) {
					//initialize the entity on the selectables subsytem list
					if (typeof Selectables[entity.name] === 'undefined') {
						console.log('only once..');
						// need to wait on getting the asset loaded here
						entity.image.on('click', function (evt) {
							console.log(entity);
							if (typeof entity.selection === 'undefined') {
								console.log("toggle on");
								entity.selection = new createjs.Shape(g);
								entity.selection.x = entity.image.x;
								entity.selection.y = entity.image.y;
								stage.addChild(entity.selection);
							} else {
								console.log("toggle off");
								stage.removeChild(entity.selection);
								delete entity['selection'];
							}
						});
						Selectables[entity.name] = entity;
					}
				} else {
					throw new Error('a selectable component needs to be render aswell');
				}
				return entity;
			},
			aiMover: function(entity) {
				return entity;
			},
			keyboardMover: function (entity) {
				//object needs a position and an sprite
				if (typeof KeyboardMovers[entity.name] === 'undefined') {
					//init keyboard subsystem in this block
					KeyboardMovers[entity.name] = entity;
					//attach keyPreseed event for all bindings
					entity.keyPressed = function() {
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
			}
		};

		if (systems[subsystem] === 'undefined') {
			throw new Error('undefined subsystem, implement it in systems');
		}
		return systems[subsystem](entity);
	};

	// update each entity
	return _(entities).map(function( ent ) {
		return UpdateGameObject(ent);
	});
};
