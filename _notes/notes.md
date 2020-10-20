### commit: [feat-frontend]_user_login_reducer_and_action
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
