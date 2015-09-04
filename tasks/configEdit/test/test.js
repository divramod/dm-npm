var should = require('chai').should();
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('configEdit sync'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function success() {
        var result = require('./../index.js').start("configEdit");
        result.should.equal("configEdit");
    });

    // =========== [ start ] ===========
    it.skip('error: should ...', function error() {
        var result = require('./../index.js').start("configEdit");
        result.should.equal("falseconfigEdit");
    });

});
