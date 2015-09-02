var should = require('chai').should();
var start = require('./../index.js').start;
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('example'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result =
            yield start();
        result.taskname.should.equal("example");
        result.success.should.equal(true);
    });

    // =========== [ start ] ===========
    it('error: should ...', function* error() {
        var result =
            yield start();
        result.taskname.should.equal("example");
        result.success.should.equal(false);
        result.error.message.should.equal("error message");
    });
});
