'use strict';
let AWS = require('aws-sdk');

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
module.exports.process = async (event, context) => {
  console.log(`Received Message: ${JSON.stringify(event.Records[0].body)}`)
  await sleep(1000)
  console.log(`Processed Message: ${JSON.stringify(event.Records[0].body)}`)
  return { message: 'Successfully processed!', event };
};

module.exports.generate = async (event, context) => {
  let sqs = new AWS.SQS();
  const numOfEvents = event.number
  const currentTime = new Date().toISOString()
  const params = {
    MessageBody: `An event generated at ${currentTime}`, 
    QueueUrl: process.env.QUEUE_URL, 
  };

  const msgs = Array.from({length: numOfEvents}, (v, k) => {
    const params = {
      MessageBody: `Event No ${k} from batch ${currentTime}`,
      QueueUrl: process.env.QUEUE_URL, 
    }
    return sqs.sendMessage(params).promise()
  })

  await Promise.all(msgs)

  return { message: `${numOfEvents} sent to queue!`, event};
};
