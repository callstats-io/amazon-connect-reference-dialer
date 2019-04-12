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
      "CONNECT_URL": "amazon connect ccp url. The CCP domain name only. For example, "callstatsio.awsapps.com",
      "HTTP_PORT": "8080",
      "NODE_ENV": "development"
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
