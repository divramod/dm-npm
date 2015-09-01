// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(module_path) {
    try {
        console.log("Reinstall npm modules".red);
        console.log("delete directory node_modules".blue);
        spawn('rm -rf node_modules');
        console.log("npm install".blue);
        spawn('npm install');
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
