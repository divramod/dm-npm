var should = require('chai').should();
var npmName = require('../index');
var start = npmName.start;
require("shelljs/global");

describe('dm-npm ', function() {
    it('index.js should be existent', function() {
        start().should.equal('start');
    });
});
