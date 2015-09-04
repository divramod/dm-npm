// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(dirname) {
    var result = {};
    var command = "cd " + dirname + " && " + "npm install . -g";
    spawn(command);

    return yield Promise.resolve(result);
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
