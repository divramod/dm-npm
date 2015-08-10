// =========== [ REQUIRE ] ===========
var co = require("co");
var path = require("path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        var configFiles = [];
        configFiles = find(env['HOME'] + '/dotfiles/dm').filter(function(file) {
            return file.match(/\.json$/);
        });
        for (var i = 0, l = configFiles.length; i < l; i++) {
            var configFilePath = configFiles[i];
            var filename = path.basename(configFilePath);
            ln("-sf", configFilePath, env["HOME"] + "/." + filename);
        }
    } catch (e) {
        console.log(" Filename: ", __filename, "\ n ", e.stack);
    }
    return yield Promise.resolve(configFiles);
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
