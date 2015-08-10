var should = require('chai').should();
var colors = require("colors");
require("shelljs/global");

// =========== [ dm-util TESTS ] ===========
describe('dm-util linkConfigFiles', function() {

    //console.log("run dm-npm linkConfigFiles".blue);

    // =========== [ fail ] ===========
    it('should create links for existing config files', function* testStart() {
        try {
            var linkConfigFiles = require(process.cwd() + "/jobs/linkConfigFiles/index.js").start;
            var configFiles =
                yield linkConfigFiles();
        } catch (e) {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        //configFiles[0].should.equal("test");
        configFiles.length.should.equal(2);
    });

});
