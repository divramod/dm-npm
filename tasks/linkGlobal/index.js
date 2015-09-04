// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
var dmFile = require("dm-file");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(dirname) {
    var result = {};
    var packageJson = dmFile.getJsonFromFile(dirname + "/package.json");
    var moduleName = packageJson.name;
    var command = "npm uninstall -g " + moduleName;
    spawn(command);
    var command = "cd " + dirname + " && " + "npm install . -g";
    spawn(command);

    return yield Promise.resolve(result);
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
