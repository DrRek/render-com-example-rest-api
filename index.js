const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Render!');
});

const executeCommand = (cmd, req, res) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error: ${stderr}`);
    }
    res.send(`<div>stdout:</div><pre>${stdout}</pre><div>stderr:</div><pre>${stderr}</pre>`);
  });
} 

// New endpoint that executes "ls -la" for a specified directory
app.get('/execute', (req, res) => {
  const cmd = req.query.cmd;
  executeCommand(cmd, req, res)
});

// POST request handling
app.post('/execute', (req, res) => {
  const cmd = req.body.cmd;
  executeCommand(cmd, req, res)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
