const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

exports.s3Upload = async (file) => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return await s3.upload(params).promise();
};
