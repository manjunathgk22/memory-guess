const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname))

app.get(/.*/, (req, res)=>{res.send(__dirname + '/index.html')})

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log('listening')
})