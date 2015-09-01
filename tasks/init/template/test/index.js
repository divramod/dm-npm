var should = require('chai').should();
var index = require('../index').index;
var colors = require("colors");

// =========== [ NPM_MODULE_NAME TESTS ] ===========
describe('NPM_MODULE_NAME', function() {

    console.log("run NPM_MODULE_NAME tests".blue);

    // =========== [ help ] ===========
    it('job undefined', function* testUndefined() {
        process.env.dmnJob = "paskdjföalskdjflk";
        var result =
            yield index();
        result.job.should.equal("undefined");
        result.success.should.equal(true);
    });

    // =========== [ start ] ===========
    it('job start', function* testStart() {
        process.env.dmnJob = "start";
        var result =
            yield index();
        result.job.should.equal("start");
        result.success.should.equal(true);
    });

});
