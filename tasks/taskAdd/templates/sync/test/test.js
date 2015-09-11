var should = require('chai').should();
var expect = require('chai').expect;
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('TASKNAME sync'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function success() {
        var result = require('./../index.js').start("TASKNAME");
        result.should.equal("TASKNAME");
    });

    // =========== [ start ] ===========
    it.skip('error: should ...', function error() {
        var result = require('./../index.js').start("TASKNAME");
        result.should.equal("falseTASKNAME");
    });

});
