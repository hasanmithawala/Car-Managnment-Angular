const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
const port = 443;

const sslOptions = {
  pfx: fs.readFileSync(path.resolve(__dirname, 'ssl/server.pfx')),
  passphrase: '123456'
};

app.use(express.static(path.resolve(__dirname, 'dist/car-model-management')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/your-project-name/index.html'));
});

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
