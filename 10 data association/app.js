const express = require('express')
const app = express();
const userModel = require('./models/user')
const postModel = require('./models/post')

app.get('/',function(req,res){
  res.send('hey')
})
app.get('/create',async function(req,res){
  let user = await userModel.create({
    username:"nilesh",
    age:21,
    email:"nilesh@gmail.com"
  })
  res.send(user)
})

app.get('/post/create',async function(req,res){
  let post = await postModel.create({
    postdata:'sare log kaise ho?',
    user:'66b252acc48fc24597c141e0',

  })

 let user = await userModel.findOne({_id:"66b252acc48fc24597c141e0"})
 user.posts.push(post._id)
 await user.save();

 res.send({post,user})
})

app.listen(3000)