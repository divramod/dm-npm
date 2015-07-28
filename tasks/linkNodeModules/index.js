// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmPrompt = require("dm-prompt");
var _ = require("underscore");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        var directoryAnswer =
            yield dmPrompt({
                type: "input",
                name: "directory",
                message: "Please state the Directory to where node_modules should link to:"
            });
        var directory = directoryAnswer.directory;
        if (directory[0] === "~") {
            var home = env['HOME'];
            directory = directory.replace("~", home);
        }
        if (test("-d", directory)) {
            if (directory[directory.length - 1] !== "/") {
                directory += "/";
            }
            var commandOutput = exec("cd ~/code/dm && ls -d */", {
                silent: true
            }).output;
            var directories = commandOutput.split(/\r?\n/);
            directories.pop();
            directories = _.filter(directories, function(directory) {
                if (directory[0] === "_") {
                    return false;
                } else {
                    return true;
                }
            });
            for (var i = 0, l = directories.length; i < l; i++) {
                var v = directories[i];
                if (v[v.length - 1] === "/") {
                    v = v.substring(0, v.length - 1);
                }
                var linkPath = directory + v;

                var linkCommand = "ln -s " + linkPath + " node_modules/" + v;
                exec('rm -rf node_modules/' + v, {
                    silent: false
                });
                exec(linkCommand, {
                    silent: true
                });
            }
        } else {
            console.log("The path you gave me, is not existent!".red);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()


// =========== [ MODULE EXPORT ] ===========
module.exports = job;
