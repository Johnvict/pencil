# Setup Guide
 - Clone this Repository:
   - ```$ git clone https://github.com/Johnvict/pencil.git```
 
 - Navigate into app directory:
   - ```$ cd pencil```
 
 - Install dependencies by running following command
   - ```$ npm install```

 - If you are testing the app on local, 
   - Create a mongoDB database with the name `pencil` and change the `DATABASE` in [this config details in](https://github.com/Johnvict/pencil/blob/main/config.env)
   - Make sure to call the seed endpoint so let the app seed the database with provided values: [Seed database ](http://localhost:8080/seed-db) 


#
# Running App
## Start app on development
```
$ npm start:dev
```
## Start app on production
```
$ npm run start:prod
```
## Run Test
```
$ npm run test
```

#
## Sample Requests

**On Local**

  1. [Cell Structure and Organisation](http://localhost:8080/search?q=Cell%20Structure%20and%20Organisation) (http://localhost:8080/search?q=Cell%20Structure%20and%20Organisation)
   
  2. [State that large molecules are synthesised from smaller basic units ](http://localhost:8080/search?q=State%20that%20large%20molecules%20are%20synthesised%20from%20smaller%20basic%20units) (http://localhost:8080/search?q=State%20that%20large%20molecules%20are%20synthesised%20from%20smaller%20basic%20units)


**On Heroku**
  1. [Cell Structure and Organisation](https://johnvict-pencil.herokuapp.com/search?q=Cell%20Structure%20and%20Organisation) (https://johnvict-pencil.herokuapp.com/search?q=Cell%20Structure%20and%20Organisation)
   
  2. [State that large molecules are synthesised from smaller basic units ](https://johnvict-pencil.herokuapp.com/search?q=State%20that%20large%20molecules%20are%20synthesised%20from%20smaller%20basic%20units) (https://johnvict-pencil.herokuapp.com/search?q=State%20that%20large%20molecules%20are%20synthesised%20from%20smaller%20basic%20units)




#
## POSSIBLE IMPROVEMENTS
 - Use of docker
 - More modularizing
 - Setup deployment pipeline, and lots more
