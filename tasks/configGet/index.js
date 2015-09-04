// =========== [ REQUIRE ] ===========
var co = require("co");
var dmFile = require("dm-file");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ SYNC task.start() ] ===========
task.start = function(filePath) {
    try {
        var filePath = filePath || undefined;
        var configJson = dmFile.getJsonFromFile(filePath);
        if (configJson.message) {
            configJson = undefined;
        }
        return configJson;
    } catch (e) {
        if (process.env.debug === "true") {
            console.log("Filename: ", __filename, "\n", e.stack);
        }
        return e;
    }
}; // task.start()


// =========== [ MODULE EXPORT ] ===========
module.exports = task;
