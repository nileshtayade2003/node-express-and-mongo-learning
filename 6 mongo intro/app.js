const express = require('express')
const app = express();

const userModel = require('./usermodel')

app.get('/',(req,res)=>{
  res.send('hey');
});

app.get('/create',async (req,res)=>{
  let createduser = await userModel.create({
    name:'nilima',
    username:'nilima@123',
    email:'nilima@gmail.com'
  })

  res.send(createduser)
});

app.get('/update',async (req,res)=>{
  let updateduser = await userModel.findOneAndUpdate({username:'nilesh@123'},{name:"nilesh liladhar tayade"}, {new:true})
  res.send(updateduser)
});

app.get('/read',async (req,res)=>{
  let users = await userModel.find()
  res.send(users)
});

app.get ('/delete',async (req,res)=>{
  let deleteduser = await userModel.findOneAndDelete({username:'nilesh@123'})
  res.send(deleteduser)
})
app.listen(3000);