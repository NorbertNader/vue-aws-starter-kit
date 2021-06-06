# AWS + Vue.js starter kit

I created this project for a talk I did at the Geekle Vue.js global Summit.  
I will update the readme with a link to the presentation...

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

# Client rendering

To run as client rendered

```bash
vue serve
```

This will start a server at `http://localhost:8080`.