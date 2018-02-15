# USAGE
1. instal Mongodb -> https://docs.mongodb.com/manual/installation/
2. if on windows -> create data/db folder in C:\ directory
3. click on bat file in this projects root directory
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
const jwt = localStorage.getItem('token');
axios.get(localhost:3001/users, {
  headers: {
    authorization: jwt
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
    "pointLog": [],
    "totalPoints": 0
  },
  {
    "_id": "5a7182c4f04e2d7e68bd7d3d",
    "username": "markus.maelzer",
    "email": "markus@gmail.com",
    "firstName": "markus",
    "lastName": "mälzer",
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
  "_id": "5a7084d498808845f84b3185",
  "username": "mm.mm",
  "email": "wenge@gmail.com",
  "firstName": "mm",
  "lastName": "mm",
  "pointLog": [],
  "totalPoints": 0,
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
  "username": "markus.maelzer",
  "email": "markus@gmail.com"
}
```

### PATCH: /users
>__localhost:3001/users__

Adds Points to Users wich id where passed in the Request.
It also adds an entry to the PointLog Array of that user.
#### IMPORTANT NOTE
> id's must be passed as an ARRAY in an object with the property ids
  it can be a single id aswell but it still has to be an array

#### Expected in Request
```
{
	"ids": ["5a71d6ba75322964ec52879a","5a71d6bc75322964ec52879b"],
	"addPoints": 3
}
```
#### Example Response:
```
{
  "n": 2,
  "nModified": 2,
  "ok": 1
}
```
?not sure if i want to keep this as the response?

### POST: /users
> __localhost:3001/users__

recieves emails in an array and saves them to the signup valid db.
then sends emails to the emails saved in the db.

#### Expected in Request
```
{
  "emails": ["wengee@test.com", "email@test.com"]
}
```

#### Expected Response
```
[
  {
    "_id": 5a7c0b7321a78206b0c436cc,
    "email": "wengee@test.com"
  }
  {
    "_id": 5a7c0b7321a78206b0c436cd,
    "email": "email@test.com"
  }
]
```

## USER ROUTES
### GET: /profile
> __localhost:3001/profile__

add new users through email. A automatically generated link will be send to all specified emails.

#### Expected in Request
```
{
	"emails": ["wengee@test.com", "email@test.com"]
}
```
### Expected Response
```
[
  {
    "__v": 0,
    "_id": "5a7c0b7321a78206b0c436cd",
    "email": "wengee@test.com"
  }
  {
    "__v": 0,
    "_id": "5a7c0b7322a78206bt5c436cd",
    "email": "email@test.com"
  }
]
```

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

Authenticate User with Username & Password
#### Expected in Request
```
{
	"username": "firstname.lastname",
	"password": "admin123"
}
```
#### Example Response
```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YTcwODUyODY1M2M2ZTY5YWM2ZWZjZWMiLCJpYXQiOjE1MTczMjY4OTU1MTV9.HtM4QczWj0mmVIqf5qyA8XmEk2sui3-nwM7R-IdHyfM",
  "role": "admin",
  "_id": "5a7bfc6554a98c4ba0fe91b2"
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

### POST: /validate/signup
> __localhost:3001/validate/signup__

validate if someone is allowed to Signup

> validation works through a parameter in a link send to an email

#### Expected in Request
```
{
  id: 5a7bfc6554a98c4ba0fe91b2
}
```
provide valid mongodb id

#### Expected Response
```
true
or
Unauthorized
```
