var should = require('chai').should();
var index = require('../index');
require("shelljs/global");

// =========== [  ] ===========
// TODO
describe('dm-deploy ', function() {
    it('should not create a tag if tag already existent', function*() {
        var result =
            yield index.start();
        result.pwd.should.equal("test");
    });
});
