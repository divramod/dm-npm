// =========== [ REQUIRE ] ===========
var co = require("co");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(dirname) {
    try {
        var dirname = dirname || process.argv[3] || undefined;
        run(dirname);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*(dirname) {
    var markdownVersion = exec('markdown1 --version', {
        silent: true
    }).output;
    var lynxVersion = exec('lynx --version', {
        silent: true
    }).output;
    if (markdownVersion.indexOf("not found") === -1 && lynxVersion.indexOf("not found") === -1) {
        var commandMarkdown = "markdown " + dirname + "/README.md | lynx -stdin";
        spawn(commandMarkdown);
    } else {
        var command = "cat " + dirname + "/README.md | less";
        spawn(command);
    }
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
