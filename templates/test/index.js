var should = require('chai').should();
var dmNpmName = require('../index');
var start = dmNpmName.start;

describe('Start', function() {
    it('should return String "start"', function() {
        start().should.equal('start');
    });
});
