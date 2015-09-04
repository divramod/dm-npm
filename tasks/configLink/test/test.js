var should = require('chai').should();
var expect = require('chai').expect;
var colors = require("colors");

// =========== [ npm-module-name TESTS ] ===========
describe('configLink'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("configLinkSync");
    });

    // =========== [ start ] ===========
    it.skip('error: should ...', function* error() {
        var result =
            yield require('./../index.js').startAsync();
        result.should.equal("falseconfigLinkSync");
    });

});
