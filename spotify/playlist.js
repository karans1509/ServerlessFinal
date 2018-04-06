'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.playlist = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'playlists',
        Item: {
            id: uuid.v1(),
            playlist: data.playlist,
            song: data.song
        }
    }

    dynamoDb.put(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error("couldnt create playlist"));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: "song has been added to playlist" }),
        }
        callback(null, response);
    })
}