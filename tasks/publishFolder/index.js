// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmPath = require("dm-path");
var colors = require("colors");
var path = require("path");
require('shelljs/global');

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(p1) {
    var p1 = p1 || process.argv[3] || undefined;
    try {
        console.log("start publishFolder");

        var folderAnswer =
            yield dmPrompt({
                type: "input",
                name: "folder",
                message: "Which folder do you want to publish?"
            });
        var folder = dmPath.replace(folderAnswer.folder);

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
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
