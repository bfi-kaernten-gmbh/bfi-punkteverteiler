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

Get all users with the role 'user' (max number of users you get in 1 request might be added soon)
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
