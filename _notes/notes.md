### commit: [feat-frontend]\_user_login_reducer_and_action

Seems like a huge security risk to me, literally just stashing name, email, id, and token for anyone to see and manipulate with JavaScript, not too mention if they are admin as well.

I guess we can implement functions in Node.js to using JWT to store only user id.
Send JWT to client via cookie and set "http only" flag and SameSite attribute like below:

```javascript
httpOnly: true,
// Flags the cookie to be accessible only by the web server to prevent cross site scripting attack
sameSite: true, // equals to 'strict'
secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // Use it if your site has SSL connect set up
```

Reference for this approach:

> expressjs.com/en/api.html#res.cookie
>
> would sessionstorage be any better?

---

payment method it is not stored in localStorege, this is the reason that dissapears

### Prepare for deploy on heroku
1. add this to the server.js file

```javascript
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
```
2. make sure you have .env and /build-> /frontend/build in .gitignore file
3. for heroky, use your terminal and paste 
> brew tap heroku/brew && brew install heroku

4. in your project root
> heroku login

5. create a new application
> heroky create [name_of_your_app]

6. create at root a file named 'Procfile' and add
> web: node backend/server.js

7. add a post buid script in package.json
> "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"