//bcrypt to hash a password usig sha256 algorithm
const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser())

app.get('/',(req,res)=>{
  var token = jwt.sign({ email: 'nilesh@gmail.com' }, "secret");
  res.cookie('token',token)
  res.send('done')
})

app.get('/read',(req,res)=>{
  // console.log(req.cookies.token)
  let data = jwt.verify(req.cookies.token,"secret")
  console.log(data)
  res.send('read page')
})


app.listen(3000);