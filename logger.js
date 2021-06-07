const Logger = (key, value) => {
  fetch(`https://<metrics-lambda-id>.execute-api.us-east-1.amazonaws.com/Prod/log?${key}=${value}`)
    .then(response => response.json())
    .then(data => console.log('logged', data));
}

export default Logger;