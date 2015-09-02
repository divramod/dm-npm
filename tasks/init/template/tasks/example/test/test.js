var should = require('chai').should();
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('example sync'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result = require('./../index.js').start();
        result.should.equal("example");
    });

    // =========== [ start ] ===========
    it('error: should ...', function* error() {
        var result = require('./../index.js').start();
        result.should.equal("falseexample");
    });

});

// =========== [ dm-file TESTS ] ===========
describe('example asyn'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("example");
    });

    // =========== [ start ] ===========
    it('error: should ...', function* error() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("falseexample");
    });

});
