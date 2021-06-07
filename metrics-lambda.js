const { CloudWatchClient, PutMetricDataCommand } = require('@aws-sdk/client-cloudwatch');

exports.lambdaHandler = async (event) => {
  const client = new CloudWatchClient({ region: 'us-east-1' });

  const metricKey = Object.keys(event.queryStringParameters)[0];
  const metricValue = event.queryStringParameters[metricKey];

  const params = {
    MetricData: [
      {
        MetricName: Object.keys(event.queryStringParameters)[0],
        Timestamp: new Date(),
        Value: metricValue,
        Unit: 'Count'
      }
    ],
    Namespace: 'ClientMetrics'
  };
  const command = new PutMetricDataCommand(params);

  try {
    await client.send(command);

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'https://<ssr-lambda-id>.execute-api.us-east-1.amazonaws.com',
        'Access-Control-Allow-Methods': 'OPTIONS, GET'
      },
      body: JSON.stringify(event.queryStringParameters)
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ error: `could not log metrics: ${JSON.stringify(error)}` })
    }
  }
};
