var should = require('chai').should();
var start = require('./../index.js').run;
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('init'.blue, function() {

    // =========== [ success ] ===========
    it('should return valid json', function* testStart() {
        var result =
            yield start();
        result.should.equal("divramod");
    });
});
