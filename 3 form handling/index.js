const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(function(req,res,next){
  console.log('middleware chala');
  next();
});

app.use(function(req,res,next){
  console.log('middleware chala ek aur bar');
  next();
});

app.get("/",function(req,res){
  res.send("champion mera anuj");
})
app.get("/about",function(req,res){
  res.send("about page hai ye.");
})
app.get("/profile",function(req,res,next){
  return next(new Error("something went wrong"))
  res.send("about page hai ye.");
})

app.use(function(err,req,res,next){
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.listen(3000)