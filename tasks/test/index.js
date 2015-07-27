// =========== [ REQUIRE ] ===========
var co = require("co");
var inquirer = require("inquirer");
var Promise = require('bluebird');
var _ = require('lodash');
var Prompt = require("./../../lib/prompt.js");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*() {

    var question = {
        type: 'list',
        name: 'selection',
        message: 'Please select a name',
        choices: ['Tom', 'Mary', 'Sue']
    };

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
    }, {
        type: "input",
        name: "phone",
        message: "What's your phone number",
        validate: function(value) {
          return true;
        }
    }];

    //console.log("in");
    var name =
        yield Prompt(questions);

    console.log(name);
}); // job.start()


// =========== [ MODULE EXPORT ] ===========
module.exports = job;

// =========== [ inquirer async ] ===========
//var questions = [{
//type: "input",
//name: "first_name",
//message: "What's your first name"
//}, {
//type: "input",
//name: "last_name",
//message: "What's your last name",
//default: function() {
//return "Doe";
//}
//}];

//inquirer.prompt(questions, function(answers) {
//console.log(JSON.stringify(answers, null, "  "));
//});
