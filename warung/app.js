
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) 

app.use(session({
  secret: 'keyboard cat',
  resave: false, //biar ringan, jadi gak semuanya ke save
  saveUninitialized: false, 
  cookie: { 
    secure: false, //https
    sameSite: true // biar gak kena csrf attack
  } 
}))

app.use(router)



app.listen(port, () => {
  console.log(`Warung-Online listening on port ${port}`)
})
