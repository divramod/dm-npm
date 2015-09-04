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
var inquirer = require("inquirer");
var path = require("path");
var spawn = require("dm-shell").spawn;
var dmPrompt = require("dm-prompt").Inquirer;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.create ] ===========
task.start = co.wrap(function*(dirname) {
    console.log("task create local link started".yellow);
    var message = "You are currently at" + process.cwd() + ". Do you want to link your module to this directory? [Y]";
    var currentDirectoryAnswer =
        yield dmPrompt({
            type: "input",
            name: "currentDirectory",
            message: message
        });
    var currentDirectory = currentDirectoryAnswer.currentDirectory;
    if (currentDirectory === "Y") {

        var dirname = dirname || process.cwd();
        if (dirname.indexOf("node_modules") > -1) {
            dirname = process.cwd();
        }
        console.log(dirname);
        var taskResult = {};
        var pathNodeModules = "/usr/local/lib/node_modules";
        var pathBin = "/usr/local/bin";
        var pathPackageJson = path.join(dirname, "package.json");
        if (test('-f', pathPackageJson)) {
            // =========== [ vars ] ===========
            var packageJson = JSON.parse(fs.readFileSync(pathPackageJson, 'utf8'));
            var moduleName = packageJson.name;

            // =========== [ create link from pathNodeModules to current Directory ] ===========
            var linkTarget = pathNodeModules + "/" + moduleName;
            if (test("-e", linkTarget)) {
                console.log("linkTarget", linkTarget);
                rm("-rf", linkTarget);
            }
            var commandNodeModules = "ln -s " + dirname + " " + pathNodeModules + "/" + moduleName;
            // =========== [ create link from shortcut to node directory ] ===========
            if (packageJson.bin) {
                var p = packageJson.bin;
                for (var key in p) {
                    if (p.hasOwnProperty(key)) {
                        var linkTarget = pathBin + "/" + key;
                        if (test("-L", linkTarget)) {
                            var commandRmLink = "rm " + linkTarget;
                            console.log(commandRmLink);
                            spawn(commandRmLink);
                        }
                        var commandLinkBinToNode = "ln -s " + dirname + "/" + p[key].substring(2, p[key].length) + " " + pathBin + "/" + key;
                        console.log(commandLinkBinToNode);
                        spawn(commandLinkBinToNode);
                    }
                }
            } else {
                console.log("Error: no bin property found in package.json!".red);
            }
        } else {
            console.log("Local link creation aborted.".red);
        }
    } else {
        console.log("Error: no package.json found!".red);
    };
    console.log("task create local link done".yellow);
    return yield Promise.resolve(taskResult);
}); // task.create

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
