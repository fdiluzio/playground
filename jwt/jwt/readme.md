## [Tutorial](https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4)

```
curl -X GET http://localhost:8000
```

> {"success":false,"message":"Auth token is not supplied"}

```
curl --header "Content-Type: application/json"   --request POST   --data '{"password":"password", "username":"admin"}'   http://localhost:8000/login
```

```
curl -X GET \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTgxNjkzNTAzLCJleHAiOjE1ODE3Nzk5MDN9.Nk9cIKn4zhsj54QMRo-_YNTDsySK_0PhmoJ2d2pwCBc' \
  http://localhost:8000
  ```

## [Tutorial 2](https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e)