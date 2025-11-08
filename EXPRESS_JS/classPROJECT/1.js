const express = require('express');
const app = express();
const PORT = 3000;

 
app.get('/', (req, res) => {
  res.send('📄 This is a GET request (home page)');
});
 
app.post('/submit', (req, res) => {
  res.send('✅ POST request received (data created)');
  console.log(req.body);
});

 
app.put('/update', (req, res) => {
  res.send('📝 PUT request received (data updated)');
});

 
app.delete('/remove', (req, res) => {
  res.send('🗑️ DELETE request received (data deleted)');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
