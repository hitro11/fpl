const express       = require('express'),
			app           = express(),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
	    LocalStrategy = require('passport-local'),

      // models
      Team          = require('./models/team'),
      User          = require('./models/user');
      
      
      

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));



// connect to db 
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


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "dortmund 2019 bundesliga champions",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});
	

/////////////////////////////////////////////routes
app.get('/', (req, res) => {
	
	res.render('landing');
	
});

app.get("/login", (req, res) => {
   res.render('login');
});

app.get('/home', (req, res) => {
	
	var users, teams;
	
	User.find({	
		
	}).then((users, err) => {
			users = users
			
		
	}).catch(err => {
		console.log(err);
	});
	
	Team.find({	
		
	}).then((teams, err) => {
			teams = teams;
		
	}).catch(err => {
		console.log(err);
	});
	
	res.render('home', {users, teams});
	
});

app.get('/register', (req, res) => {
	
	res.render('register');
	
});

app.get('/team/new', (req, res) => {
	
	res.render('newTeam');
	
});

app.get("/logout", (req, res) => {
   req.logout();
   res.redirect("/");
});

///////Post routes
app.post('/register', (req, res) => {
	
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password)
		.then(() => {
			res.redirect('/team/new');
		})
		.catch( err => {
			console.log(err);
			res.redirect('/register');
			
		});
	
});
	


app.post('/login', passport.authenticate('local',

	{
		successRedirect: '/home',
		failureRedirect: '/'
	}), (req,res) => {
});







// middleware

// checks if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}







app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));