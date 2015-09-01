// =========== [ REQUIRE ] ===========
var co = require("co");
var path = require("path");
var dmPath = require("dm-path");
var dmPrompt = require("dm-prompt").Inquirer;
var fs = require("fs");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        //var configFiles = [];
        //configFiles = find(env['HOME'] + '/dotfiles/dm').filter(function(file) {
        //return file.match(/\.json$/);
        //});
        // =========== [ 1 get path ] ===========
        var configPath = dmPath.replace("~/.dm-npm.json");
        var defaultMessage = "";
        var folder = undefined;
        if (test("-f", configPath)) {
            var config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.linkConfigFiles.path) {
                defaultMessage = " (" + config.linkConfigFiles.path + ")";
                folder = dmPath.replace(config.linkConfigFiles.path);
            }
        }
        var folderAnswer =
            yield dmPrompt({
                type: "input",
                name: "folder",
                message: "Which folder do you want to publish?" + defaultMessage
            });
        if (folderAnswer.folder !== "") {
            folder = dmPath.replace(folderAnswer.folder);
        }
        if (!folder) {
            console.log("You cannot leave the folder blank!".red);
        } else {

            var files = ls(folder);
            console.log(files);
            for (var i = 0, l = files.length; i < l; i++) {
                var configFilePath = folder + "/" + files[i];
                var filename = path.basename(configFilePath);
                var filePathDest = env["HOME"] + "/." + filename;
                if (test("-f", filePathDest)) {
                    rm(filePathDest);
                }
                ln("-sf", configFilePath, filePathDest);
                var message = "Linked from " + configFilePath + " to " + filePathDest;
                console.log(message.green);
            }
        }

    } catch (e) {
        console.log(" Filename: ", __filename, "\ n ", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
