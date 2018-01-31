# USAGE
__ instal Mongodb __
https://docs.mongodb.com/manual/installation/
```
npm i
npm start
```

# API ENDPOINTS

#### IMPORTANT NOTE
You need to include the JWT in the property 'authentication' in your REQUEST HEADER
example: (with axios)
```
axios.get(localhost:3001/users, {
  headers: {
    authentication: JSON WEB TOKEN
  }
})
```

Access | Endpoint | Method | Example(Url) | Sample Response | Description
------ | -------- | ------ | ------------ | --------------- | -----------
Admin | /users | GET | localhost:3001/users | ``` [{"_id":"5a70845c98808845f84b3183","username":"mm.mm","email":"mm@mm.at","firstName":"mm","lastName":"mm","__v":0,"pointLog":[],"totalPoints":0},{"_id":"5a7182c4f04e2d7e68bd7d3d","username":"markus.maelzer","email":"markus@gmail.com","firstName":"markus","lastName":"mälzer","__v":0,"pointLog":[],"totalPoints":0}] ``` | Get all users with the role 'user' (max number of users in 1 request might be added soon)
