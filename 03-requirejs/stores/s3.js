var requirejs = require('requirejs');
var AWS = require('aws-sdk');

requirejs.define('s3Store', function(require, exports, module) {

  var configuration = require('configuration');
  var s3 = new AWS.S3();

  AWS.config.update({
    region: configuration.aws.region,
    accessKeyId: configuration.aws.key,
    secretAccessKey: configuration.aws.secret
  });

  exports.put = function(filename, data, callback) {
    s3.putObject({
      Bucket: 'myBucket',
      Key: filename
      Body: data
    }, callback);
  };

});
