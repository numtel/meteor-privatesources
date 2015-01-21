// XXX: TODO: TEST SUITE!!!!!???
var fs = Npm.require('fs');
var outputFile = '/tmp/publicscores-test.data';
var uniqueSplitter = '#########940bd99b2b7560243cf280afa1e800b7\n\n'
var content = fs.readFileSync(outputFile)
  .toString('utf-8').split(uniqueSplitter);
content.shift(); // First item always blank

console.log(content);
// Write your tests here!
// Here is an example.
Tinytest.add('example', function (test) {
  test.equal(true, true);
});
