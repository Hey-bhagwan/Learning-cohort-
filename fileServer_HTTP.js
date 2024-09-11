const express = require("express");
const app = express();

const fs = require("fs");

const path = require('path');

app.get("/files",(req,res)=>{
    fs.readdir(__dirname,'utf-8',(err,data)=>{
        res.json({
            data
        })
    })
})

app.get("/files/:name", (req, res) => {
    const name = req.params.name;
    const filePath = path.join(__dirname,'files',name);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }
        res.json({ data });
    });
  
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found..' });
});

app.listen(3000);