const AWS = require('aws-sdk');
const S3 = new AWS.S3({ accessKeyId: 'AKIAR37OMDLLQG6JAZMS', secretAccessKey: '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', region: 'ap-south-1'});
const s3Bucket = 'linkedup';
function uploadToS3(file, fileName,) {
  return new Promise((resolve, reject) => {
    S3.upload({
      Body: file.data,
      Bucket: s3Bucket,
      Key:  fileName
    }, (error) => {
      if (error) {
        console.log("some error while uploading to s3")
        console.log(error);
        reject(error)
      } else {
        resolve(fileName);
      }
    })
  });//end new promise
}
module.exports = {
    uploadToS3,
}