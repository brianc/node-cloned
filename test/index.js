var fs = require('fs');
var assert = require('assert');

var cloned = require(__dirname + '/../')
var workingDir = __dirname + '/.working';

cloned.workingDir = workingDir;

describe('cloned', function() {
  after(function(done) {
    require('rmdir')(cloned.workingDir, done);
  });

  it('works', function(done) {
    cloned('d1a57ed', function(err, module) {
      if(err) return done(err);
      assert.equal(typeof module.CURRENT_SHA, "undefined")
      cloned('183bfd9', function(err, repoDir, clean) {
        if(err) return done(err);
        var module = require(repoDir);
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

  it('supports installing modules', function(done) {
    var wantedSha = 'aa9e877';
    cloned(wantedSha, function(err, dir, clean) {
      assert(fs.existsSync(workingDir + '/aa9e877/node_modules/rmdir'));
      var module = require(dir);
      module._getCurrentSha(function(err, sha) {
        assert.equal(sha, wantedSha);
        clean(done);
      })
    });
  });

  it('returns clean method even if there is an error', function(done) {
    cloned('asld', function(err, module, clean) {
      assert(err);
      assert.equal(module, null);
      assert.equal(typeof clean, 'function');
      clean(done);
    });
  });

  it('clones remote', function(done) {
    cloned('git://github.com/brianc/node-sql.git@813ea7e0', function(err, module, clean) {
      assert.ifError(err);
      assert(fs.existsSync(module + '/node_modules/tap'));
      var json = JSON.parse(fs.readFileSync(module + '/package.json'));
      assert.equal('0.2.0', json.version);
      done();
    });
  });
});
