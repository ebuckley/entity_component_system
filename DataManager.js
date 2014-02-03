var _ = require('underscore'),
	fs = require('fs');

// Factory for a Data object
var Data = function (foldername) {
	var objectFolder = foldername || __dirname + '/game_data';
	return {
		load : function ( filename ) {
			var Data = {};
			if (_.isArray(filename)) {
				_(filename).each(function( item ) {
					Data[item] = require(objectFolder + '/' + item).objects;
				});
			} else if (typeof filename === 'string') {
				Data[filename] = require( objectFolder + '/' +  filename).objects;
			} else {
				Data.objects = require(objectFolder + '/objects.json').objects;
			}
			return Data;
		},
		save: function ( Data ) {
			
			var result = _(Data).map(function (item, key) {
				try {
					var filePath = objectFolder + '/' + key + '.json';
					var data = {
						objects: item
					};
					fs.writeFileSync(filePath, JSON.stringify(data));
				} catch(e) {
					return false;
				}
				return true;
			}).reduce(function(prev, current) {
				return prev && current;
			});
			return result;
		}
	};
};

module.exports = Data;
