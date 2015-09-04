var should = require('chai').should();
var colors = require("colors");

// =========== [ npm-module-name TESTS ] ===========
describe('configAdd async'.red, function() {

    // =========== [ start ] ===========
    it('success: should ...', function* success() {
        var result =
            yield require('./../index.js').start(process.cwd(), "~/.dm-test.json");
        result.should.equal("config file created");
    });

    // =========== [ start ] ===========
    it.skip('error: should ...', function* error() {
        var result =
            yield require('./../index.js').start(process.cwd());
        result.should.equal("");
    });

});
