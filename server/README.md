# USAGE
__ instal Mongodb __
https://docs.mongodb.com/manual/installation/
```
npm i
npm start
```

# API ENDPOINTS
for now the server url is: __localhost:3001/__

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

## ADMIN ROUTES
### GET: /users
> __localhost:3001/users__

Get all users with the role 'user' (max number of users you get in 1 request might be added soon)
#### Expected in Request
* JWT in request header (like described in the IMPORTANT NOTE)
#### Example Response:
```
[
  {
    "_id": "5a70845c98808845f84b3183",
    "username": "mm.mm",
    "email": "mm@mm.at",
    "firstName": "mm",
    "lastName": "mm",
    "__v": 0,
    "pointLog": [],
    "totalPoints": 0
  },
  {
    "_id": "5a7182c4f04e2d7e68bd7d3d",
    "username": "markus.maelzer",
    "email": "markus@gmail.com",
    "firstName": "markus",
    "lastName": "mälzer",
    "__v": 0,
    "pointLog": [],
    "totalPoints": 0
  }
]
```

### GET: /users/:id
>__localhost:3001/users/5a70845c98808845f84b3183__

Get a single user through id
#### Expected in Request
* user id in request URL
* JWT in request header (like described in the IMPORTANT NOTE)
#### Example Response:
```
{
  "user": {
    "_id": "5a7084d498808845f84b3185",
    "username": "mm.mm",
    "email": "wenge@gmail.com",
    "firstName": "mm",
    "lastName": "mm",
    "__v": 0,
    "pointLog": [],
    "totalPoints": 0,
  }
}
```

### DELETE: /users/:id
>__localhost:3001/users/5a70845c98808845f84b3183__

DELETE a single user through id
#### Expected in Request
* user id in request URL
* JWT in request header (like described in the IMPORTANT NOTE)
#### Example Response:
```
{
  "user": {
    "username": "markus.maelzer",
    "email": "markus@gmail.com"
  }
}
```

## USER ROUTES
### GET: /profile
>__localhost:3001/profile__

Get currently logged in users data
#### Expected in Request
* JWT in request header (like described in the IMPORTANT NOTE)
#### Example Response:
```
{
  "_id": "5a718b6c4f73c0832ceede56",
  "username": "markus.maelzer",
  "email": "markus@gmail.com",
  "firstName": "markus",
  "lastName": "mälzer",
  "pointLog": [],
  "totalPoints": 0
}
```

## AUHTENTICATION ROUTES

### POST: /signin
> __localhost:3001/signin__

Authenticate User with Email & Password
#### Expected in Request
```
{
	"email": "user@email.com",
	"password": "admin123"
}
```
#### Example Response
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTcwODUyODY1M2M2ZTY5YWM2ZWZjZWMiLCJpYXQiOjE1MTczMjY4OTU1MTV9.HtM4QczWj0mmVIqf5qyA8XmEk2sui3-nwM7R-IdHyfM",
    "role": "admin"
}
```

### POST: /signup
> __localhost:3001/signup__

Signup User with Email + Password + firstName + lastName
> Note: will be changed after review at 01.02.218

#### Expected in Request
```
{
	"email": "markus@gmail.com",
	"password": "1234",
	"firstName": "markus",
	"lastName": "mälzer"
}
```
#### Example Response
```
{
    "message": "Your Account is now created",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTcxOGI2YzRmNzNjMDgzMmNlZWRlNTYiLCJpYXQiOjE1MTczOTA3MDA3NzB9.-4pify7MYSZ0NKVIPvz0BOtVemwW0E8ZZvP-BBI-h-A"
}
```
