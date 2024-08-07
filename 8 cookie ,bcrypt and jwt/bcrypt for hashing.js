//bcrypt to hash a password usig sha256 algorithm
const express = require('express')
const app = express();
const bcrypt = require('bcrypt')


app.get('/',(req,res)=>{
  // to encrypt
  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash('pass@123', salt, function(err, hash) {
  //       // Store hash in your password DB.
  //       console.log(hash)
  //     });
  // });


  //to compare
  bcrypt.compare('pass@123',"$2b$10$sO89i7n9Yh.agtU7NjnHWuvcc5QNCtEE8Z/YbAeKG1ia.nNg3/SHu", function(err, result) {
    // result == true
    console.log(result)
  });
})


app.listen(3000);