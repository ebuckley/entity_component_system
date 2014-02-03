var testPath = __dirname + '/test_data',
	Data = new require('../DataManager')(testPath),
	fs = require('fs'),
	_ = require('underscore');

describe('Data', function() {

	beforeEach(function() {
		var files = fs.readdirSync(testPath);
		_(files).each(function(item) {
			fs.unlinkSync(testPath +'/' + item);
		});
	});

	describe('when saving', function() {
		var res = Data.save({
			a: [1,2,3,4],
			b: ['5,6,7,8']
		});

		it('should return true', function() {
			expect(res).toBe(true);
		});

		it('should have created 2 files', function () {
			_(fs.readdirSync(testPath)).each( function (item){
				expect(item === 'a' || item === 'b').toBe(true);
			});
		});
	});

	describe('when loading', function() {
		Data.save({
			a: [1,2,3,4],
			b: ['5,6,7,8']
		});
		var stuff = Data.load(['a', 'b']);

		it('should have a', function() {
			expect(_.isArray(stuff.a)).toBe(true);
		});

		it('should have b', function() {
			expect(_.isArray(stuff.b)).toBe(true);
		});

	});
});