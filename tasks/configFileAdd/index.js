// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var path = require('path');
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        console.log("start configFileAdd");

        // ask for global or local
        var locationAnswer =
            yield dmPrompt({
                type: "list",
                name: "location",
                message: "Where should the config file be placed:",
                choices: [
                    "global",
                    "home",
                    "current",
                    "input"
                ]
            });
        var location = locationAnswer.location;

        // create path
        if (location === "global") {
            var pathDirectory = dmPath.global();
        } else if (location === "home") {
            var pathDirectory = dmPath.home();
        } else if (location === "current") {
            var pathDirectory = dmPath.current();
        } else if (location === "input") {
            var pathDirectory = yield dmPath.inputOne();
        }

        var configFileName = ".dm-git";
        var filePath = path.join(pathDirectory, configFileName);
        console.log(filePath);

        //TODO create/overwrite
        if ( test("-f", filePath)) {
            console.log("true");
        } else {
             
            console.log("false");
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
