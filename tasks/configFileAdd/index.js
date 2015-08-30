// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var path = require('path');
var moment = require("moment");
var colors = require("colors");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*(filepath, filecontent) {
    try {
        console.log("start configFileAdd");
        var filepath = filepath || undefined;
        var filecontent = filecontent || undefined;

        if (!filepath) {
            //TODO: ask for filename
            var fileNameAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "fileName",
                    message: "How would you name the file? (example: .dm-npm.json for dm-npm)"
                });
            var fileName = fileNameAnswer.fileName;
            console.log(fileName);

            // ask for global or local
            var locationAnswer =
                yield dmPrompt({
                    type: "list",
                    name: "location",
                    message: "Where should the config file be placed? (best is home)",
                    choices: [
                        "home",
                        "global",
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
                var pathDirectory =
                    yield dmPath.inputOne();
            }

            var filepath = path.join(pathDirectory, fileName);
        }

        filepath = dmPath.replace(filepath);

        // create/overwrite
        if (test("-f", filepath)) {
            var now = moment().format("YYYYMMDD_HHmmssSSSS");
            mv(filepath, filepath + "_" + now);
            var message = "File existent, was moved to " + filepath + "_" + now;
            console.log(message.yellow);
        }

        if (!filecontent) {
            filecontent = [
                "{",
                "}"
            ].join("\n");
        }

        filecontent.to(filepath);
        if (test('-e', filepath)) {
            var message = "File " + filepath + " created!";
            console.log(message.green);
            var catRe = cat(filepath);
            console.log(catRe);
        } else {
            var message = "File " + filepath + " not created!";
            console.log(message.red);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
