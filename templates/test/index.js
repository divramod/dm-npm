var should = require('chai').should();
var npmName = require('../index');
var start = npmName.start;

describe('Start', function() {
    it('should return String "start"', function() {
        start().should.equal('start');
    });
});
