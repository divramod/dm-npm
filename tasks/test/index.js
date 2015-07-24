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
        name: "first_name",
        message: "What's your first name"
    }, {
        type: "input",
        name: "last_name",
        message: "What's your last name",
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
