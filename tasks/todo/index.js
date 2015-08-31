// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(p1) {
    var p1 = p1 || process.argv[3] || undefined;
    try {
        //console.log("start todo");
        //console.log("__dirname", __dirname);
        //console.log("__filename", __filename);
        //console.log("pwd()", pwd());
        //console.log("process.cwd()", process.cwd());
        //console.log("p1", p1);

        var command = "vim " + p1 + "/todo.md";
        var spawn = require('child_process').spawnSync;
        var myProcess = spawn('sh', ['-c', command], {
            stdio: 'inherit'
        });

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
