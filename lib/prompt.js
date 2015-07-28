var inquirer = require("inquirer");
var Promise = require('bluebird');
var _ = require('lodash');
var co = require("co");

var job = {};


// =========== [ inquirer promising ] ===========
// http://blog.paperelectron.com/promise-based-inquirer-workflow/
job.start = function Prompt(prompt) {
    return new Promise(function(resolve, reject) {
        inquirer.prompt(prompt, function(answer) {
            resolve(answer);
        });
    });
}

// =========== [ job.run ] ===========
module.exports = co.wrap(function*(questions) {
    return yield job.start(questions)
        .bind({}) // A blank object for 'this'
        .then(function(choices) {
            return choices;
        });
}); // job.run
