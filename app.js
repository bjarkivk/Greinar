const express = require('express');
const art = require('./articles.js');
const app = express();
const path = require('path');


const hostname = '127.0.0.1';
const port = 3000;


app.set('view engine', 'ejs');



app.listen(port, hostname, () => {
  //console.log(`Server running at http://${hostname}:${port}/`);
});

app.use('/img', express.static(path.join(__dirname, 'articles/img')));

app.use(express.static('public'));
app.use('/', art);


app.use((req,res) =>{
  res.status(404).render('error', { title: 'Fannst ekki', messege: 'Ó nei, efnið finnst ekki!'});
});

app.use((req,res) =>{
  res.status(500).render('error', { title: 'Villa kom upp', messege: ''});
});
