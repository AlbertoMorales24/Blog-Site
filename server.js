const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const ejs = require('ejs');

const app = express();

app.set('port', process.env.PORT || 5000);

const PORT = 5000;

var items = [];
var date = new Date();
var CurrentDate = date.toISOString().slice(0,10);
items.push({title: "Title", author: "Author", text: "Sample post text", date: CurrentDate});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static("Public"));

app.use(express.urlencoded({
    extended: true
}))

app.get('/',(req,res)=>{
    res.render("index",{items: items}); 
})

app.post('/Submit-Form',(req,res)=>{
    var title = req.body.ptitle;
    var author = req.body.pauthor;
    var text = req.body.ptext;
    date = new Date();
    CurrentDate = date.toISOString().slice(0,10);

    var obj = {title: title, author: author, text: text, date: CurrentDate};
    items.push(obj);

    res.render("index",{items: items});    
    
})

app.post('/edit',(req,res)=>{
    if(req.body.action=='edit'){
        res.render("edit",{etitle: items[req.body.index].title, eauthor: items[req.body.index].author, etext: items[req.body.index].text, index: req.body.index}); 
        
    }else{
        res.render("delete",{dtitle: items[req.body.index].title, dauthor: items[req.body.index].author, dtext: items[req.body.index].text, date: items[req.body.index].date, index: req.body.index}); 
    }
    ind = req.body.index;
})

app.post('/Edit-Form',(req,res)=>{
    var title = req.body.ptitle;
    var author = req.body.pauthor;
    var text = req.body.ptext;
    date = new Date();
    CurrentDate = date.toISOString().slice(0,10);
    var obj = {title: title, author: author, text: text, date: CurrentDate};
    items[ind]=(obj);

    res.render("index",{items: items});    
    
})

app.get('/Delete-Form',(req,res)=>{
    items.splice(ind,1);

    res.render("index",{items: items});    
    
})

app.post('/search',(req,res)=>{
    res.render("search",{items: items, searchB: req.body.searchBy.toLowerCase(), searchP: req.body.searchPar});   
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server in port", PORT);
})
