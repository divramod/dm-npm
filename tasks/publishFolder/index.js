// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var colors = require("colors");
var path = require("path");
var fs = require("fs");
require('shelljs/global');

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(p1) {
    var p1 = p1 || process.argv[3] || undefined;
    try {
        console.log("start publishFolder");


        var configPath = dmPath.replace("~/.dm-npm.json");
        var defaultMessage = "";
        var folder = undefined;
        if (test("-f", configPath)) {
            var config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.publishFolder.path) {
                defaultMessage = " (" + config.publishFolder.path + ")";
                folder = dmPath.replace(config.publishFolder.path);
            }
        }

        var folderAnswer =
            yield dmPrompt({
                type: "input",
                name: "folder",
                message: "Which folder do you want to publish?" + defaultMessage
            });
        if (folderAnswer.folder !== "") {
            folder = dmPath.replace(folderAnswer.folder);
        }
        if (!folder) {
            console.log("You cannot leave the folder blank!".red);
        } else {
            var modules = ls(folder);
            var message = modules.length + " modules to publish!";
            console.log(message.green);
            console.log("Modules starting with _ wont be published!".yellow);
            for (var i = 0, l = modules.length; i < l; i++) {
                var m = modules[i];
                if (m.indexOf("_") !== 0) {
                    var modulePath = path.resolve(folder, m);
                    var publish = require("../../jobs/publish/index.js").start;
                    yield publish(modulePath);
                }
            }
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
