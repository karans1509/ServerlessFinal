'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()
const lambda = new AWS.Lambda({
  region: 'us-west-2'
})

module.exports.removeFile = (event) => {
    console.log("S3 event")
    console.log(event.Records)

    const params = {
        Bucket: 'spotify-demo'
    }

    event.Records.forEach((record) => {
        const filename = record.s3.object.key;
        const eventType = record.eventName
        const eventTime = record.eventTime
    
        const dbparams = {
          TableName: 'songs',
          Key: {
            songName: filename
          }
        }
    
        dynamoDb.delete(dbparams, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("data deleted")
        })
      });
}