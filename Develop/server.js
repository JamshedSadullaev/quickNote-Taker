const express = require('express');
const path = require('path');
const PORT =process.env.PORT ||3001;
const fs = require('fs');
const app = express();

const dv =require('./db/db.json');
const exp = require('constants');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
// get route
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/notes.html'));
})

app.get('/api/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'./db/db.json'));
})
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public.index.html'));
})
// post route
app.post('/api/notes',(req,res)=>{
    const note = req.body;
    const parse =JSON.parse(fs.readFileSync('./db/db.json',"utf-8"));
    const length =(parse.length).toString();

    note.id =length;
    parse.push(note);
    fs.writeFileSync('./db/db.json',JSON.stringify(parse));
    res.json(parse);
})


app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})


