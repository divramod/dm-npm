var should = require('chai').should();
var index = require('../index').index;
var colors = require("colors");

// =========== [ dm-npm TESTS ] ===========
// TODO
describe('dm-npm', function() {

    console.log("run dm-npm tests".blue);

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

    // =========== [ init ] ===========
    it('job init', function* testInit() {

        process.env.dmnJob = "init";

        var result =
            yield index();

        result.job.should.equal("init");
        result.success.should.equal(true);
    });
});
