# BEAMY-server

##MongoDB backend of Beamy

### Setup

- Fork this repo
- Clone this repo
- Run MongoDB locally (for example MongoDB Compass)
- In the root folder create .env file and add the following lines to it:

```shell
PORT=5005
ORIGIN=http://localhost:3000
TOKEN_SECRET=superSecret
MONGODB_URI=mongodb://localhost:27017
```

### Run 

```shell
$ cd BEAMY-server
$ npm install
$ npm start
```
