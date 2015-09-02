var should = require('chai').should();
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('TASKNAME sync'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result = require('./../index.js').start();
        result.should.equal("TASKNAME");
    });

    // =========== [ start ] ===========
    it('error: should ...', function* error() {
        var result = require('./../index.js').start();
        result.should.equal("falseTASKNAME");
    });

});

// =========== [ dm-file TESTS ] ===========
describe('TASKNAME asyn'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("TASKNAME");
    });

    // =========== [ start ] ===========
    it('error: should ...', function* error() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("falseTASKNAME");
    });

});
