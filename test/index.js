var fs = require('fs');
var assert = require('assert');

var requireSha = require(__dirname + '/../')

var workingDir = __dirname + '/.working';
describe('require-sha', function() {
  after(function(done) {
    require('rmdir')(workingDir, done);
  });
  it('works', function(done) {
    requireSha(workingDir, 'd1a57ed', function(err, module) {
      if(err) return done(err);
      assert.equal(typeof module.CURRENT_SHA, "undefined")
      done();
    });
  });
});
