// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");
var Prompt = require("./../../lib/prompt.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(module_path) {
    try {
        console.log("Reinstall npm modules\n\n".red);

        console.log("delete directory node_modules".blue);
        exec('rm -rf node_modules', {
          silent: false
        });
        console.log("npm install".blue);
        exec('npm install', {
          silent: false
        });

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
