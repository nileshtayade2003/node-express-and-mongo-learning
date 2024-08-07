const express = require("express");
const app = express();

const userModel = require('./models/user')

const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create",(req, res) => {
  let {username,email,password,age} = req.body;
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async (err,hash)=>{
       let createduser = await userModel.create({
              username,
              email,
              password:hash,
              age
          })

          let token = jwt.sign({email},'shhhhhhhh')
          res.cookie('token',token)
          res.send(createduser);
    })
  }) 
});

 //login route
 app.get('/login',function(req,res){
  res.render('login')
})

 app.post('/login',async function(req,res){
  let user = await userModel.findOne({email:req.body.email})
  if(!user) return res.send('something went wrong')

  bcrypt.compare(req.body.password,user.password,function(err,result){
    if(result){
      let token = jwt.sign({email:user.email},'shhhhhhhh')
      res.cookie('token',token)
      res.send('You Can Login')
    }
    else{
      res.send('Something Went Wrong')
    }
    res.send(result?"You Can Login.":"Something is Wrong.")
  })
})


//logout route
app.get('/logout',(req,res)=>{
  res.cookie('token','')
  res.redirect('/')
})

app.listen(3000);
