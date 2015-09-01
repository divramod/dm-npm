// =========== [ REQUIRE ] ===========
var co = require("co");
var inquirer = require("inquirer");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*() {

    var questions = [{
        type: "input",
        name: "q1",
        message: "q1"
    }, {
        type: "input",
        name: "q2",
        message: "q2",
        default: function() {
            return "Doe";
        }
    }];

    inquirer.prompt(questions, function(answers) {
        console.log(JSON.stringify(answers, null, "  "));
    });
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
