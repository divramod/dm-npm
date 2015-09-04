// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
var dmPath = require("dm-path");
var dmFile = require("dm-file");
var path = require("path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ SYNC task.start() ] ===========
task.start = function(dirname, filePath) {
    try {
        var dirname = dirname || process.argv[3] || undefined;
        var filePath = filePath || undefined;
        var packageJson = dmFile.getJsonFromFile(path.resolve(dirname, "package.json"));
        var moduleName = packageJson.name;
        if (!filePath) {
            filePath = "~/." + moduleName + ".json";
        }
        filePath = dmPath.replace(filePath);
        var command = env['EDITOR'] + " " + filePath;
        spawn(command);
        return "success";
    } catch (e) {
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        return e;
    }
}; // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
