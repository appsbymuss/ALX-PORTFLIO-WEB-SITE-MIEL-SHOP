# Project Title

A brief description of what this project does and who it's for


## Environment Variables

- To run this project, you will need to add the following environment variables to your **.env** file:

#### Database
`DB_URL`

`DB_NAME`

#### Server

`HOST`

`PORT`

#### Email (Subject to change)

`PRIMARY_EMAIL`

`PRIMARY_EMAIL_TOKEN`

#### Auth

`JWT_SECRET_KEY`

#### Push Notification API

`PUSH_PUBLIC_KEY`

`PUSH_PRIVATE_KEY`

#### MondialRelay API

`MR_ENSEIGNE`

`MR_PRIVATEKEY`

#### Stripe Payement API

`STRIPE_PUBLIC_KEY`

`STRIPE_PRIVATE KEY`

`STRIPE_WEBHOOK_SECRET`

`PAY_SUCCESS_URL`

`PAY_CANCEL_URL`

#### Cloudinary API

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API`

`CLOUDINARY_SECRET`

#### OAuth 2.0 Client Credentials

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`GOOGLE_OAUTH_REDIRECT_URL`

`OAUTH_CLIENT_URL` (redirection)

- And you should also set the following for these files (**docker-compose.yml**, **nginx.conf**, **debian-setup.sh**)

#### In *debian-setup.sh* (In the case of Monolithic **Ubuntu Deployement**)

`MYSQL_ROOT_PASSWORD`

`MYSQL_DATABASE`

#### In *docker-compose.yml* (In the case of **Local Multi-Container Deployement**)

`MYSQL_ROOT_PASSWORD`

`MYSQL_DATABASE`

#### In *nginx.conf* (In either **cases**)

`server_name`

`localhost` or `express_app (dynamic dns name)`