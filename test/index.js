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
      requireSha(workingDir, '183bfd9', function(err, module, clean) {
        if(err) return done(err);
        assert.equal(module.CURRENT_SHA, 'd1a57ed');
        assert(fs.existsSync(workingDir + '/d1a57ed'));
          assert(fs.existsSync(workingDir + '/183bfd9'));
        clean(function(err) {
          assert(fs.existsSync(workingDir + '/d1a57ed'));
          assert(!fs.existsSync(workingDir + '/183bfd9'));
          done();
        });
      });
    });
  });

  it('does not require working dir', function(done) {
    var wantedSha = 'e707037';
    requireSha(wantedSha, function(err, module, clean) {
      module._getCurrentSha(function(err, sha) {
        console.log(sha);
        assert.equal(sha, wantedSha);
        clean(done);
      })
    });
  });

  it('supports installing modules', function() {
  });
});
