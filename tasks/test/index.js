// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        var command = "cd " + __dirname + " && ls && zsh";
        var spawn = require('child_process').spawnSync;
        var myProcess = spawn('sh', ['-c', command], {
            stdio: 'inherit'
        });
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
