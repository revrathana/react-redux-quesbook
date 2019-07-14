# qbookweb

Setting up Quesbook Web application locally

1) clone repo to your machine

git clone git@github.com:quesbook/qbookweb.git

2) after cloning make sure you have the rails application working on your local machine

https://github.com/quesbook/quesbook

3) install all the packages with npm

npm install

4) to run the application use npm

npm run start


Building the application

Staging:
1) ensure you have changed the URL in src/constants/urls.js from localhost to app-stg.quesbook.com:

Comment out this line:
URL = 'http://localhost:3000';

Uncomment this line:
//URL = 'https://app-stg.quesbook.com';

2) run:

npm run build

Production:

1) run:

npm run build


Deploying the application:

1) build the application as above

2) scp the files from the build folder to the server:

scp -r build/* rails@app-stg.quesbook.com:/home/rails/apps/qb-react-web/start_new/
