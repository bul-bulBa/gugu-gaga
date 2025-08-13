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
    posts: preData.posts
  }

  res.json(data);
})

app.post('/profile', (req, res) => {
  const {name, password, location} = req.body
  console.log(name);
  
  const validateName = globalUsersArr.find(u => u.fullName === name)
  console.log(validateName);
  
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
    followed: { it: [], they: [] }
  }
  globalUsersArr.push(newUser)

  res.json('New user')
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
    const userId = globalUsersArr.find(u => u.fullName == req.body.name && u.password == req.body.password)
    const userArr = {id: userId.id, avatar: userId.avatar, followed: userId.followed}
    res.cookie('name', encodeURIComponent(req.body.name), opts)
    res.cookie('password', encodeURIComponent(req.body.password), opts)
    return res.json(userArr)
  } else if(requestCookiesName && requestCookiesPassword) {
    const userId = globalUsersArr.find(u => u.fullName == requestCookiesName && u.password == requestCookiesPassword)
    const userArr = {id: userId.id, avatar: userId.avatar, followed: userId.followed}
    return res.json(userArr)
  } else {
    return res.status(401).json({error: 'invalid data'})
  }
})

app.post('/toggleFollowing', (req, res) => {
  const authUser = globalUsersArr.find(u => u.id === req.body.authUserId)
  
  if(authUser.followed.it.includes(req.body.id)) {
    const index = authUser.followed.it.indexOf(req.body.id)
    authUser.followed.it.splice(index, 1);
  } else {
    authUser.followed.it.push(req.body.id)
  }

  res.json(authUser.followed.it)
})

// app.get('/messages', (_, res) => {
//   res.json(messages);
// });

// app.post('/messages', (req, res) => {
//   const newMsg = { id: Date.now(), ...req.body };
//   messages.push(newMsg);
//   res.status(201).json(newMsg);
// });

app.listen(PORT, () => {
  console.log(`Локальний API: http://localhost:${PORT}`);
})











