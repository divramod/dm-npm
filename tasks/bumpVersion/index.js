// =========== [ REQUIRE ] ===========
var co = require("co");
var semver = require("semver");
var fs = require('fs');
var inquirer = require("inquirer");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    console.log("bump version");

    inquirer.prompt([{
        type: "list",
        name: "release_type",
        message: "What do you want to do?",
        choices: [
            "patch",
            "minor",
            "major",
            "premajor",
            "preminor",
            "prepatch",
            "prerelease"
        ]
    }], function(answers) {
        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var newVersion = semver.inc(packageJson.version, answers.release_type);
        sed('-i', /"version": *"[0-9]+.[0-9]+.[0-9]+"/, '"version": "' + newVersion + '"', 'package.json');

        var newVersionString = "new version: " + newVersion;
        var oldVersionString = "old version: " + packageJson.version
        console.log(oldVersionString.yellow);
        console.log(newVersionString.green);

    });
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
