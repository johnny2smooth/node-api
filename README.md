# Hello

This is my first attempt at building anything with express.

I will be using this as a place to document what I am learning and how the project is supposed to work.

## app.use()

Scott Moss used:

```js
app.use((req,res,nex) => {...})
```

to introduce use to middleware. The `.use()` will fire before anything else, when it is called before the

```js
app.get("/", () => {...})
```

is instantiated and our app opens up for anything else.

## app.route((req,res,next){...middleware handler..})

So I just stumbled across another way to handle middleware in my app. This way is route specific.

```js
app.route("/events")
  .all(function (req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  })
  .get(...);
```

The route method is now telling the app to, for all instances of when when a route begins with events, run this middleware. That is pretty cool!

## Routing

So far, I have learned that I can handle various routes with the Router(). I have set up a page to handle various API routes like this:

```js
// Product
router.get("/product", (req, res) => {
  res.json({
    hello: "GET status???",
  });
});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product", () => {});
router.delete("/product/:id", () => {});
```

I think that this will be th preferred way to break my routes into chunks.

it's cool isn't it?? As I continue through the documentation, I see that this is how we create more of a 'mini-app'. When a route or multiple routes are segmented into this 'mini-app' you can have more control over what middleware runs and when it does. You can also handle all those routes how you want, then ship that info back up into the top level and mount all of that logic there.

We can use many HTTP methods beyond get, put, patch, post and delete. But we'll ignore those for now. What I am more interested has to do with how we handle params. You can add params directly to the url by prefixing the param with a colon `:`. The Express documentation says the following

_Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys._

```js
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

_To define routes with route parameters, simply specify the route parameters in the path of the route as shown below._

```js
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});
```

_Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes._

```js
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

I don't really know what is going on with `app.param`. I will look into that later

## Authentication

### JWT

So we make the token... That's cool and all. But what is coolest so far is that we are setting up protection with our /api route. We don't want anyone just willy nilly getting access to our stuff! No. So everything _BEFORE_ the routers get hit will have to go through our protector first.

Initially, we were only passing the router Class that we had instantiated earlier to be used when anything after `/api` was hit.

```js
app.use("/api", router);
```

But now we will pass in the protector here as further middleware! The protect function will reject anything without a bearer token, as we've set it up so far. I just tried to run a `GET` request to my `/api/product` endpoint, but now I am getting back a message that tells me I am not allowed. SICKKKK.

```js
app.use("/api", protect, router);
```

## Headers

Headers are metadata. We can put what we want there, and authorization lives there.

## Creating a JWT

Authentication does not have to be difficult. We protect our paths with some middleware, then we open those paths up to people with the right credentials. For us, the 'right credentials' means a JSON Web Token (JWT). But we only give away the JWT under certain circumstances. The user has to initially earn a token by creating an account with us. They can also earn a token by signing in. These are the two entrances that we have opened up so far that will allow a user to get access to our API.

I am thinking of JWT as a 🔑 to our locked-down API. So far, we have created two doors for the JWT to pass through. So far, we are encoding the `user.id` and `user.username` into the JWT. We should strive to keep the JWT as short as possible, but we can also store more information there, like `user.role` if we had that.
