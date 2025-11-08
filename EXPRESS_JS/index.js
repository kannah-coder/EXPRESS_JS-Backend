const express = require('express');
const app = express();
const port = 3000;
const path=require('path');

app.use(express.static(path.join(__dirname,"public")));
app.get('/hello/:name', (req, res) => { // it cannot be '/' becauze we use middle ware app.use()
  res.send('Hello World!'+req.params.name)
})
app.get('/about', (req, res) => {
   res.sendFile(path.join(__dirname,'index.html'));
   res.status(500);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})