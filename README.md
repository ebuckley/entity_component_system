Getting Started
=
	npm install
	node server

You should be able to see the client at localhost:3030

To get familiarized take a look at public/js/application.js and public/js/objects.js.
Each entity is defined in game_data/objects.json. The subscriptions is the list of entity.subs, they are implemented in objects.js in the Subsystem(entity) function.


Tests
=
I did do some unit tests of DataManager, I really do need to write more tests at some stage though
	npm install -dev
	node test
	
Goal
=
* ECS architecture
* Network Driven
* Easy for designers to import assets
* Easy to design levels and behaviours from an editor