// =========== [ REQUIRE ] ===========
require("shelljs/global");

// =========== [ DEFINE ] ===========
var dmNpm = {};

// =========== [ npmName.start ] ===========
dmNpm.start = function() {
    

    return "start";
}; // npmName.start

// =========== [ dmNpm.createIndexJs() ] ===========
// TODO
dmNpm.createIndexJs = function() {
  var src = "./templates/index.js";
  exec('cp ' + src + " .", {
    silent: false
  });
}; //dmNpm.createIndexJs()


module.exports = dmNpm;
