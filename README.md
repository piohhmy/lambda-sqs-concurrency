# lambda-sqs-concurrency
This repo explores how the Lambda middleware handles throttled requests from an SQS event source.  

## How to Use This Repo

1. Install the Serverless framework: `npm install`
2. Deploy the resources to your AWS account: `npx serverless deploy`.  This will create the following:
  * An SQS Queue
  * A Dead Letter Queue that is attached to the SQS Queue
  * Generator Lambda: A lambda that can be invoked to send an arbitrary number of events to the SQS queue
  * Processor Lambda: A lambda that is subscribed to the SQS queue.  It sleeps for 1 second and then returns successfully.  It is has a concurrent execution limit of 10.
3. Invoke the Generator Lambda specifying the number of messages to generate:  `npx serverless invoke -f generator -d '{"number": 100}'`


