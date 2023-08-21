# todo

- [x] provide/inject a composable
- [x] cookie interface
  - get payload
  - set payload
- [ ] login/logout/etc
- proxy
  - `auth.fetch(any)`
    - [x] make the request - somehow pass in a request function
    - [ ] get headers - pass in a callback in a request function
- [ ] maybe middleware eventually (with a composable?)
- [ ] test getting the urls
- [ ] set cookies

---

next time

- [ ] add plugin to nuxt, try making a request to register

---

_notes:_

- urls are hardcoded for now
- on not logged in hook maybe later
- oauth 2 not supported for now
- maybe have a hook when a user instance is received
