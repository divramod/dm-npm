var should = require('chai').should();
var expect = require('chai').expect;
var colors = require("colors");

// =========== [ dm-file TESTS ] ===========
describe('configGet sync'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function success() {
        var result = require('./../index.js').start("~/.dm-npm.json");
        expect(result).to.be.a('object');
    });

    // =========== [ start ] ===========
    it('error: should ...', function error() {
        var result = require('./../index.js').start("~/dm-npm.json");
        expect(result).to.be.a('undefined');
    });

});
