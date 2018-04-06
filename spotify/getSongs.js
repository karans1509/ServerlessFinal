'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: 'songs'
}
const s3 = new AWS.S3({
    params: { Bucket: 'spotify-demo' }
});

module.exports.getSongs = (event, context, callback) => {
    const params = {
        Bucket: 'spotify-demo'
    }
    
    console.log("list songs")
    s3.listObjects(params, (err, data) => {
        if(err) {
            console.error(err);
            callback(new Error('couldnt get the objects'));
            return
        }

        const songs = []
        data.Contents.forEach(song => {
            songs.push(song.Key)
        })

        if(songs.length > 0) {
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify(songs)
            };
            callback(null, response);
        }
        else {
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({message: "No songs in the bucket"})
            };
            callback(null, response);
        }
        
        
    })
}