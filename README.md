# Amazon-connect-reference-dialer
Amazon connect reference dialer application by CALLSTATS I/O


#### Quick Start

##### Note: 
- The application use appconfig to parse application specific configuration. Without proper configuration parameter the application
will not run.

- After cloning the application, please change the /config/appconfig.json file with your configuration. 
 
    ```bash
    {
      "APP_ID": "callstats application ID",
      "APP_SECRET": "callstats application secret",
      "CONNECT_URL": "amazon connect ccp url. The CCP domain name only. For example, callstatsio.awsapps.com",
      "HTTP_PORT": "8080",
      "NODE_ENV": "development",
      "CS_JS_SDK_URL": "https://api.callstats.io/static/callstats.min.js",
      "CS_AC_SHIM_URL": "https://api.callstats.io/static/callstats-amazon-shim.js"
    }
    ```


##### How to build, and run:
```bash

# Clone the repository
git clone https://github.com/callstats-io/amazon-connect-reference-dialer.git

# Go inside the directory
cd amazon-connect-reference-dialer

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)

```

#### Docker version of the application

- Change your docker-compose runtime arguments. It is similar to previous configuration

    ```bash
      APP_ID: 'callstats application ID'
      APP_SECRET: 'callstats application secret'
      CONNECT_URL: 'amazon connect ccp url. The CCP domain name only. For example, callstatsio.awsapps.com'
      HTTP_PORT: '8082'
      NODE_ENV: 'production'
      CS_JS_SDK_URL: 'https://api.callstats.io/static/callstats.min.js'
      CS_AC_SHIM_URL: 'https://api.callstats.io/static/callstats-amazon-shim.js'
    ```
- Build image 
     ```bash
       docker-compose build
     ``` 
- Run instance
     ```bash
       docker-compose up
     ```     
