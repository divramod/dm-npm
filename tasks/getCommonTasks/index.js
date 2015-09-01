// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(argv2, dirname) {
    try {
        run(argv2, dirname);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ run ] ===========
var run = co.wrap(function*(argv2, dirname) {
    //TODO
    // add bumpVersion
    // add publish
    // add upate dm-npm
    // add config file add
    // add installGlobal
    // add linkLocal
    // add reinstall
    
    // =========== [ todo ] ===========
    if (["todo"].indexOf(argv2) > -1) {
        require("dm-npm").todo(dirname);
    }
    // =========== [ todo ] ===========
    else if (["taskAdd", "ta"].indexOf(argv2) > -1) {
        require("dm-npm").taskAdd(dirname);
    }
    // =========== [ idea ] ===========
    else if (["idea"].indexOf(argv2) > -1) {
        require("dm-npm").idea(dirname);
    }
    // =========== [ prompt ] ===========
    else if (["prompt", "p"].indexOf(argv2) > -1) {
        require("dm-npm").prompt(dirname);
    }
    // =========== [ prompt ] ===========
    else {
        require("dm-npm").help(dirname);
    }
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
