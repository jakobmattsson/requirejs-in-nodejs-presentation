var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var tree = require('../tree');

tree.register('mongoStore', function(configuration) {

  AWS.config.update({
    region: configuration.aws.region,
    accessKeyId: configuration.aws.key,
    secretAccessKey: configuration.aws.secret
  });

  return {
    put: function(filename, data, callback) {
      s3.putObject({
        Bucket: 'myBucket',
        Key: filename
        Body: data
      }, callback);
    }
  };
});
