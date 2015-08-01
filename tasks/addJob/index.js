// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
var dmPrompt = require("dm-prompt").Inquirer;
var dmUtil = require("dm-util");
var path = require("path");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {

        // ask for job name
        var jobNameAnswer =
            yield dmPrompt({
                type: "input",
                name: "jobName",
                message: "Please enter the Job Name:"
            });
        var jobName = jobNameAnswer.jobName;
        console.log(jobName);

        // get possible job pathes (all folders under modules and top level jobs)
        var possiblePathes = [];
        if (test("-d", "modules")) {
            var possiblePathes = ls("modules");
        }
        possiblePathes.push("jobs");

        // ask for job path and adapt it
        var jobPathAnswer =
            yield dmPrompt({
                type: "list",
                name: "jobPath",
                message: "Please choose the path for the job:",
                choices: possiblePathes
            });
        var jobPath = jobPathAnswer.jobPath;
        if (jobPath !== "jobs") {
            jobPath = path.join("modules", jobPath, "jobs", jobName);
        } else {
            jobPath = path.join("jobs", jobName);
        }
        jobPath = path.join(process.cwd(), jobPath);

        console.log(jobPath);

        // create job
        var configJob = {
            templatePath: __dirname + '/templates',
            targetPath: jobPath,
            deleteBefore: true,
            overwrite: true, // [true, false, "ask"]
            rename: ["files", "dirs"], // renames
            replace: [{
                search: "JOBNAME",
                replace: jobName
            }],
            messages: {
                success: "Job " + jobName + " created!",
                error: "Job " + jobName + " not created!"
            }
        };
        dmUtil.cpTemplate(configJob);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
