const express = require('express'),
      app = express(),
      mongoose = require("mongoose"),
      bodyParser = require('body-parser');
      

mongoose.connect('mongodb+srv://rohit:YRlBGdzruS3k7p5A@fpl-oxx5j.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=> {
    console.log('connected to db');
    
}).catch(err => {
    console.log(err);
    
});


app.set('view engine', 'ejs');
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  res.render('landing');
});







app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));