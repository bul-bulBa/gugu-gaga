const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const globalUsersArr = require('./users.cjs')

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const PORT = 3000;

const getUsers = (PAGE, LIMIT, res) => {
    const page = (parseInt(PAGE) || 1) - 1;
    const limit = parseInt(LIMIT) || 4;
    const offset = (page * limit);
    const allUsers = globalUsersArr.length
    const preData = globalUsersArr.slice(offset, offset + limit).map(u => ({
      id: u.id,
      fullName: u.fullName,
      about: u.about,
      avatar: u.avatar,
      location: u.location
    }))
    data = {
      users: preData,
      allUsers
    }
    res.json(data);
}

const getProfile = (user) => {
  return data = {
    id: user.id,
    fullName: user.fullName,
    about: user.about,
    avatar: user.avatar,
    profilePhoto: user.profilePhoto,
    location: user.location,
    posts: user.posts,
    status: user.status
  }
}

// 🔹 Маршрути
app.get('/users', (req, res) => {
    getUsers(req.query.page, req.query.limit, res)
});

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

  if(req.body.name && req.body.password) {
    const user = globalUsersArr.find(u => u.fullName == req.body.name && u.password == req.body.password)
    !user ? res.status(401).json({error: 'такого користувача не існує'}) : null
    const userArr = {id: user.id, avatar: user.avatar, followed: user.followed}
    res.cookie('name', encodeURIComponent(req.body.name), opts)
    res.cookie('password', encodeURIComponent(req.body.password), opts)
    return res.json(userArr)
  } else if(requestCookiesName && requestCookiesPassword) {
    const user = globalUsersArr.find(u => u.fullName == requestCookiesName && u.password == requestCookiesPassword)
    const userArr = {id: user.id, avatar: user.avatar, followed: user.followed}
    return res.json(userArr)
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('name', {path: '/'})
  res.clearCookie('password',  {path: '/', maxAge: 0})
  res.sendStatus(200)
})

app.post('/profile', (req, res) => {
  const {name, password, location} = req.body
  const validateName = globalUsersArr.find(u => u.fullName === name)
  
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
