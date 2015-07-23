/**
 * Create a link to the local dev directory.
 * Used to avoid to reinstall the npm module globally to save time.
 * Needs:
 *   package.json in the directory where it is executed
 *   package.json needs bin property
 */

// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var fs = require("fs");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.create ] ===========
job.run = co.wrap(function*() {
    console.log("task create local link started".yellow);
    var taskResult = {};
    var pathNodeModules = "/usr/local/lib/node_modules";
    var pathBin = "/usr/local/bin";
    if (test('-f', "package.json")) {
        // =========== [ vars ] ===========
        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var moduleName = packageJson.name;
        var currentDirectory = exec('pwd', {
            silent: true
        }).output.trim();

        // =========== [ create link from pathNodeModules to current Directory ] ===========
        var linkTarget = pathNodeModules + "/" + moduleName;
        if (test("-e", linkTarget)) {
            rm("-rf", linkTarget);
        }
        var commandNodeModules = "ln -s " + currentDirectory + " " + pathNodeModules + "/" + moduleName;
        //console.log(commandNodeModules);
        exec(commandNodeModules, {
            silent: false
        });

        // =========== [ create link from shortcut to node directory ] ===========
        if (packageJson.bin) {
            var p = packageJson.bin;
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    var linkTarget = pathBin + "/" + key;
                    if (test("-e", linkTarget)) {
                        rm(linkTarget);
                    }
                    var commandLinkBinToNode = "ln -s " + pathNodeModules + "/" + moduleName + "/" + p[key].substring(2, p[key].length) + " " + pathBin + "/" + key;
                    //console.log(commandLinkBinToNode);
                    exec(commandLinkBinToNode, {
                        silent: false
                    });
                }
            }
        } else {
            console.log("Error: no bin property found in package.json!".red);
        }
    } else {
        console.log("Error: no package.json found!".red);
    };
    console.log("task create local link done".yellow);
    return yield Promise.resolve(taskResult);
}); // job.create

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
