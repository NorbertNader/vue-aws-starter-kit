# AWS + Vue.js starter kit

I created this project for a talk I did at the Geekle Vue.js global Summit.

This is a starter kit to get a simple Vue.js app up and running and move it to the AWS Cloud.  
It includes server side rendering, code split routes and lazy loading components.  
The app will deploy as a Node.js Lambda.  
You also get a metrics lambda to log some basic metrics to Amazon CloudWatch.

# Prerequisite

Make sure ou are on node14+.

You can use `n` to switch the node version.

https://www.npmjs.com/package/n

### Install app dependencies.

```bash
npm install
```

### You will also need to install vue cli globally.

```bash
npm install -g @vue/cli
```

Read more here https://cli.vuejs.org/guide/installation.html

### For instant prototyping also install these dependencies.

```bash
npm install -g @vue/cli-service-global && npm install -g @vue/compiler-sfc
```

Read more here https://cli.vuejs.org/guide/prototyping.html

# SSR

To run as a server side rendered app switch to ssr branch.

```bash
git checkout ssr-app
```

To run the app in ssr mode you wil first need to build the bundles.

```bash
npm run build
```

Now you can start the server.

```bash
npm run serve:ssr
```

This will start a server at `http://localhost:8080`.

# Running local lambda for SSR

To start using the lambda locally you will need to follow the sam install.

This will require installing docker as well and sharing the project directory.

You might need to create a docker account and sign in locally if you reach limit for max image requests.

You will need to build the app first.

```bash
npm run build
```

Then build the lambda. This will also move the dist directory to the sam build.

```bash
npm run build:lambda
```

Now you can test the lambda locally.

```bash
npm run serve:lambda
```

# Deploying to production

## Setup aws credentials

To move the app to the AWS cloud you will first need to create an aws account.

Then you will need to install the aws cli.

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

Install sam cli.

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

Set your global aws credentials which we will need for moving our app to the cloud.

https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html

Follow the presentation here https://www.slideshare.net/NorbertNader/vue-presentation-249091110/NorbertNader/vue-presentation-249091110

Once you have your infrastructure set up you will need to update the placeholders.

* asset-uploader.sh - replace <s3-bucket-name> with the name of your s3 bucket.
* logger.js - replace <metrics-lambda-id> with your metrics lambda id.
* metrics-lambda.js - replace <ssr-lambda-id> with your metrics lambda id.
* vue.config.js - replace <cloudfront-id> with your cloudfront id.

Upload your assets to s3.

```bash
npm run upload:assets
```

Then simply run the deploy command to deploy your lambda functions.

```bash
npm run deploy:lambda
```

Grab a coffee as your app deploys to production :)

## CI/CD

After developing you can upload your assets and deploy your lambdas.

```bash
npm run upload:assets && npm run deploy:lambda
```

Or you can build this into your CI/CD pipeline.

One thing to keep in mind is that the metrics api endpoint is hard coded.

You will need to update the endpoint if you update the sam lambda.

The same goes for the ssr lambda, so the api endpoint will change for your app.

## TODO

* Add HMR for SSR
* Automate infra setup instead of having to follow presentation. Probably use CDK and create a note script like `npm run infra:create <accountId>`
* Add typescript, linting and tests