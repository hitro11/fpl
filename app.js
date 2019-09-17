const express = require('express'),
      app = express(),
      mongoose = require("mongoose"),
      passport    = require("passport"),
      bodyParser = require('body-parser'),
      
      User        = require("./models/user");
      
      
app.set('view engine', 'ejs');
app.use(express.static('public'));
      
const url = 'mongodb+srv://rohit:M2jUJnZfZzPLUKdP@cluster0-oxx5j.mongodb.net/fpl?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
}).then((db, err)=> {
	  
    console.log('connected to db!');
    
}).catch(err => {
    console.log(err);
    
});



//routes
app.get('/', (req, res) => {
	
	User.find({	
		
	}).then((users, err) => {
			res.render('landing', {users});
		
	}).catch(err => {
		console.log(err);
	})
	
});

	






app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));