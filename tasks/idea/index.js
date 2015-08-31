// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
require('shelljs/global');

// =========== [ MODULE DEFINE ] ===========
var task = {};

// =========== [ task.start() ] ===========
task.start = co.wrap(function*(modulePath) {
    try {
        var modulePath = modulePath || process.argv[3] || undefined;
        console.log("start idea");
        var ideaAnswer =
            yield dmPrompt({
                type: "input",
                name: "idea",
                message: "What is your idea?"
            });
        var idea = ideaAnswer.idea;
        var ideasMdPath = modulePath + "/ideas.md";
        idea.toEnd(ideasMdPath);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // task.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = task;
