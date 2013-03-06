var assert = require('assert');

describe('require-sha', function() {
  it('works', function(done) {
    var workingDir = __dirname + '/.working';
    requireSha(workingDir, '9856c7e', function(err, module) {
      if(err) return done(err);

    });
  });
});
