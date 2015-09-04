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
    try {

        //TODO
        // add reinstall
        // add reinit
        // add upate dm-npm

        // =========== [ bumpVersion ] ===========
        if (["bumpVersion", "bump"].indexOf(argv2) > -1) {
            require("dm-npm").bumpVersion(dirname);
        }
        // =========== [ configAdd ] ===========
        else if (["configAdd", "ca"].indexOf(argv2) > -1) {
            require("./../configAdd/index.js").start(dirname);
        }
        // =========== [ configAdd ] ===========
        else if (["configEdit", "ce"].indexOf(argv2) > -1) {
            require("./../configEdit/index.js").start(dirname);
        }
        // =========== [ configLink ] ===========
        else if (["configLink", "cl"].indexOf(argv2) > -1) {
            require("./../configLink/index.js").start(dirname);
        }
        // =========== [ todo ] ===========
        else if (["todo"].indexOf(argv2) > -1) {
            require("dm-npm").todo(dirname);
        }
        // =========== [ test ] ===========
        else if (["test", "-test"].indexOf(argv2) > -1) {
            var taskname = process.argv[3] || undefined;
            require("dm-npm").test(dirname, taskname);
        }
        // =========== [ taskAdd ] ===========
        else if (["taskAdd", "ta"].indexOf(argv2) > -1) {
            var taskType = process.argv[3] || undefined;
            require("dm-npm").taskAdd(dirname, taskType);
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
        else if (["publish"].indexOf(argv2) > -1) {
            require("dm-npm").publish(dirname);
        }
        // =========== [ prompt ] ===========
        else if (["linkLocal", "local"].indexOf(argv2) > -1) {
            require("./../linkLocal/index.js").start(dirname);
        }
        // =========== [ prompt ] ===========
        else if (["linkGlobal", "global"].indexOf(argv2) > -1) {
            require("./../linkGlobal/index.js").start(dirname);
        }
        // =========== [ help ] ===========
        else {
            require("dm-npm").help(dirname);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
}); // run

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
