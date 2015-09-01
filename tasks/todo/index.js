// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(modulePath) {
    var modulePath = modulePath || process.argv[3] || undefined;
    try {
        //console.log("start todo");
        //console.log("__dirname", __dirname);
        //console.log("__filename", __filename);
        //console.log("pwd()", pwd());
        //console.log("process.cwd()", process.cwd());
        //console.log("modulePath", modulePath);

        var command = env["EDITOR"] + " " + modulePath + "/todo.md";
        spawn(command);

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
