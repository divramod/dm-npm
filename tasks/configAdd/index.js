// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var path = require('path');
var moment = require("moment");
var colors = require("colors");
var dmFile = require("dm-file");
var spawn = require("dm-shell").spawn;
var dmPrompt = require("dm-prompt").Inquirer;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(dirname, filePath) {
    var result = "";
    try {
        var dirname = dirname || process.argv[2] || undefined;
        dirname = dmPath.replace(dirname);
        var filePath = filePath || undefined;
        var packageJson = dmFile.getJsonFromFile(path.resolve(dirname, "package.json"));
        var moduleName = packageJson.name;
        if (!filePath) {
            filePath = "~/." + moduleName + ".json";
        }
        filePath = dmPath.replace(filePath);
        var tasks = ls(path.resolve(dirname, "tasks"));
        var config = {};
        for (var i = 0, l = tasks.length; i < l; i++) {
            var t = tasks[i];
            config[t] = {};
        }
        if (!test("-f", filePath)) {
            JSON.stringify(config).to(filePath);
        } else {
            var overwriteAnswer =
                yield dmPrompt({
                    type: "input",
                    name: "overwrite",
                    message: "A config-file at path " + filePath + " is already existing!\n[o]verwrite\n[k]eep and abort\noverwrite and create [b]ackup"
                });
            var overwrite = overwriteAnswer.overwrite;
            if (overwrite === "o") {
                JSON.stringify(config).to(filePath);
            } else if (overwrite === "k") {
                console.log("creation aborted".red);
            } else if (overwrite === "b") {
                var filePathBackup = dmPath.replace("~/." + moduleName + "_" + moment().format("YYYYMMDD_HHmmssSSSS") + ".json");
                var command = "mv " + filePath + " " + filePathBackup;
                spawn(command);
            }
        }
        spawn(env['EDITOR'] + " " + filePath);
        var result = "config file created";
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve(result);
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
