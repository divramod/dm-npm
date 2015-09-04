// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
var dmPath = require("dm-path");
var dmFile = require("dm-file");
var dmPrompt = require("dm-prompt").Inquirer;
var path = require("path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        var destinationAnswer =
            yield dmPrompt({
                type: "input",
                name: "destination",
                message: "Where do you want to move and link the config file to?"
            });
        var destination = destinationAnswer.destination;
        console.log(destination);
        var config = require("./../configGet/index.js").start();


    } catch (e) {
        console.log(" Filename: ", __filename, "\ n ", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;

