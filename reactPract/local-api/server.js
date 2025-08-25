const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const globalUsersArr = require('./users.cjs')
const multer = require('multer')
const mongoose = require('mongoose')
const Fuse = require('fuse.js')

const app = express();
const upload = multer({dest: 'uploads/'})
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use('/uploads', express.static('uploads'));

const PORT = 3000;
const secretKey = '6LeErq0rAAAAAHaW9uz9V-N2f66lgKj3lZxK-Wdt'
const autocompleteUsersName = new Fuse(globalUsersArr, {keys: ['fullName']})
const mapOfUsers = new Map(globalUsersArr.map(user => [user.id, user]))

function searchUsers(fuse, allItems, term) {
  if(!term.trim || term === 'null') {
    return allItems
  } 
  return fuse.search(term).map(u => u.item)
}

// 🔹 Маршрути
app.get('/users', (req, res) => {
    const requestCookiesName = decodeURIComponent(req.cookies.name);
    const page = (Number(req.query.page) || 1) - 1;
    const limit = Number(req.query.limit) || 4;
    const term = req.query.term
    const friends = req.query.friends
    const offset = (page * limit);

    let filteredUsers = []
    if(friends === 'true') {
      const me = globalUsersArr.find(u => u.fullName === requestCookiesName)
      if(!me) return res.status(401)
// filter(Boolean) - потрібний для того, щоб якщо .get не знайде користувача з таким id, то тоді в масив myFriends 
// він додасть undefined значення. І щоб цього не сталось - цей filter відсіює всі не валідні значення 
// це потрібно в випадку, якщо користувач буде видалений а його id залишиться в іншого користувача або подібні ситуації
      
      const myFriends = me.followed.it.map(id => mapOfUsers.get(id)).filter(Boolean)
      filteredUsers = searchUsers(autocompleteUsersName, myFriends, term)
    } else {
      filteredUsers = searchUsers(autocompleteUsersName, globalUsersArr, term)
    }

    const allUsers = filteredUsers.length
    const preData = filteredUsers.slice(offset, offset + limit).map(u => ({
      id: u.id,
      fullName: u.fullName,
      about: u.about,
      avatar: u.avatar,
      location: u.location
    }))
    const data = {
      users: preData,
      allUsers
    }
    res.json(data);
});

app.get('/usersAutocomplete', (req, res) => {
  const users = autocompleteUsersName.search(req.query.term).slice(0, 5)
  const result = users.map(u => u.item.fullName)

  res.json(result)
})

app.get('/profile', (req, res) => {
  const user = req.query.user || 1
  const preData = globalUsersArr.find(u => u.id == user)
  const data = {
    id: preData.id,
    fullName: preData.fullName,
    about: preData.about,
    avatar: preData.avatar,
    profilePhoto: preData.profilePhoto,
    location: preData.location,
    posts: preData.posts,
    status: preData.status
  }

  res.json(data);
})

const opts = {
  // httpOnly: true,
  // secure: true,
  // sameSite: 'lax',
  path: '/',
  maxAge: 1000 * 60 * 60 * 24
}
app.post('/login', (req, res) => {
  const requestCookiesName = decodeURIComponent(req.cookies.name);
  const requestCookiesPassword = decodeURIComponent(req.cookies.password);

  if(req.body.name && req.body.password && req.body.captcha) {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`

    fetch(verifyURL, {method: 'POST'})
    .then(res => res.json())
    .then(data => {
      if(!data.success) {
        return res.status(400).json({message: 'invalid captcha'})
      }
    })

    const user = globalUsersArr.find(u => u.fullName == req.body.name && u.password == req.body.password)
    if(!user) return res.status(401).json({error: 'такого користувача не існує'})
    const userArr = {id: user.id, avatar: user.avatar, followed: user.followed}
    res.cookie('name', encodeURIComponent(req.body.name), opts)
    res.cookie('password', encodeURIComponent(req.body.password), opts)
    return res.json(userArr)

  } else if(requestCookiesName && requestCookiesPassword) {
    const user = globalUsersArr.find(u => u.fullName == requestCookiesName && u.password == requestCookiesPassword)
    if(!user) { return res.status(401).json({message: 'invalid cookies'})}
    const userArr = {id: user.id, avatar: user.avatar, followed: user.followed}
    return res.json(userArr)
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('name', {path: '/'})
  res.clearCookie('password',  {path: '/', maxAge: 0})
  res.sendStatus(200)
})

app.post('/profile', async (req, res) => {
  const {name, password, location, captcha} = req.body
  const validateName = globalUsersArr.find(u => u.fullName === name)
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`
  
  const validateCaptcha = await fetch(verifyURL, {method: 'POST'}).then(res => res.json())
  if(!validateCaptcha.success) {
    console.log(validateCaptcha.success)
    return res.status(400).json({message: 'invalid captcha'})
  }
    

  if(validateName) {
    return res.status(409).json({message: "Користувач з таким іменем вже існує"})
  }

  const newUser = {
    id: globalUsersArr.length + 1,
    password: password,
    fullName: name,
    about: '',
    avatar: '',
    profilePhoto: '',
    location: location,
    posts: [
      { id: '$1061', likesCount: 0, message: `Hello my name is ${name} and I'm a new gugu gaga user ;)` }
    ],
    followed: { it: [], they: [] },
    status: ''
  }
  globalUsersArr.push(newUser)

  const userArr = {id: newUser.id, avatar: newUser.avatar, followed: newUser.followed}
    res.cookie('name', encodeURIComponent(name), opts)
    res.cookie('password', encodeURIComponent(password), opts)
    return res.json(userArr)
})

app.delete('/profile', (req, res) => {
  const requestCookiesName = decodeURIComponent(req.cookies.name);
  const requestCookiesPassword = decodeURIComponent(req.cookies.password);

  if(requestCookiesName && requestCookiesPassword) {
    const user = globalUsersArr.findIndex(u => u.fullName === requestCookiesName)
    globalUsersArr.splice(user, 1)

  res.clearCookie('name', {path: '/', maxAge: 0})
  res.clearCookie('password',  {path: '/', maxAge: 0})
  res.sendStatus(200)
  } else {
    res.status(401)
  }
})

app.put('/toggleFollowing/:id', (req, res) => {
  const id = +req.params.id
  const name = decodeURIComponent(req.cookies.name)
  const me = globalUsersArr.find(u => u.fullName == name);
  if(!me) res.status(401)

  if(me.followed.it.includes(id)) {
    const index = me.followed.it.indexOf(id)
    me.followed.it.splice(index, 1);
  } else {
    me.followed.it.push(id)
  }
  
  res.json(me.followed.it)
})

app.put('/changeStatus', (req, res) => {
  const user = globalUsersArr.find(u => u.fullName === decodeURIComponent(req.cookies.name))
  if(!user) res.status(401)
  user.status = req.body.message

  res.json(user.status)
})

app.post('/edit', upload.fields([{name: 'avatar'}, {name: 'profilePhoto'}]), (req, res) => {
  const user = globalUsersArr.find(u => u.fullName === decodeURIComponent(req.cookies.name))
  if(!user) res.status(401)
  if(req.files.avatar) {
    user.avatar = `http://localhost:3000/uploads/${req.files.avatar[0].filename}`
  } else if(req.files.profilePhoto) {
     user.profilePhoto = `http://localhost:3000/uploads/${req.files.profilePhoto[0].filename}`
  }
  user.about = req.body.about
  res.status(200).json({message: 'profile edited'})
})
// app.get('/messages', (_, res) => {
//   res.json(messages);
// });

// app.post('/messages', (req, res) => {
//   const newMsg = { id: Date.now(), ...req.body };
//   messages.push(newMsg);
//   res.status(201).json(newMsg);
// });
// 123

app.listen(PORT, () => {
  console.log(`Локальний API: http://localhost:${PORT}`);
})
