// server.js
const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to run a command using child_process
app.post('/cc', (req, res) => {
  const cc = spawn('python', ['cc.py'])

  cc.stdout.on('data', (data)=>{
    data = data.toString().split('\n')
    res.json({real: parseFloat(data[0]), imaginary: parseFloat(data[1])})
  })
});

app.post('/pc', (req, res) => {
  const cc = spawn('python', ['pc.py'])
  cc.stdout.on('data', (data)=>{
    let lines = data.toString().split('\n')
    let d = []
    let r = 0;
    let im = 0;
    
    for(let i = 0; i < lines.length; i++){
      if(i%2 == 0){
        r = parseFloat(lines[i])
      } else {
        d.push({real: r, imaginary: parseFloat(lines[i])})
      }
    }

    res.json(d)
  })
});

app.post('/nc', (req, res) => {
  const cc = spawn('python', ['nc.py'])
  cc.stdout.on('data', (data)=>{
    let lines = data.toString().split('\n')
    let d = []
    let r = 0;
    let im = 0;
    
    for(let i = 0; i < lines.length; i++){
      if(i%2 == 0){
        r = parseFloat(lines[i])
      } else {
        d.push({real: r, imaginary: parseFloat(lines[i])})
      }
    }

    res.json(d)
  })
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
