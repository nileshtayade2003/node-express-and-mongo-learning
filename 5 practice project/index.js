const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express();

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));


app.get('/',function(req,res){
  fs.readdir(`./files`, function(err,files){
    res.render("index", {files:files});
  })
})

app.post('/create',function(req,res){
  fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,req.body.details,function(err){
    if(err){
      console.log("issue at /create : ",err)
    }
    res.redirect('/')
  })
})

app.post('/edit',function(req,res){
  if(req.body.new){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
      res.redirect('/')
    })
  }
})

app.get('/file/:filename',function(req,res){
  fs.readFile(`files/${req.params.filename}`,'utf-8',function(err,filedata){
    res.render('show',{filename:req.params.filename,filedata:filedata})
  })
})

app.get('/edit/:filename',function(req,res){
 res.render('edit',{filename:req.params.filename,});
})

app.listen(3000);