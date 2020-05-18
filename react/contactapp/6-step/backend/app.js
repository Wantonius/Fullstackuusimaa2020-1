const express = require("express");
const bodyParser = require("body-parser");
const contactrouter = require("./routes/contactrouter");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

let app = express();
let port = process.env.PORT || 3001

app.use(bodyParser.json());

//database

const mongourl = "mongodb+srv://test:test@cluster0-ujjvo.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongourl,{dbName:"fullstackuusimaacontactdatabase"}).then(
	() => console.log("Connection to MongoDB successful"),
	(error) => console.log("Failed to connect to MongoDB. Reason:"+error)
);

/*
	SESSION DATA
	"username":String,
	"ttl":Number,
	"token":String
*/

app.use(session({
	name:"contactapp-session-id",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
	store: new mongoStore({
		collection:"session",
		mongooseConnection:mongoose.connection,
		ttl:60*60*24
	})
}))


app.use(passport.initialize());
app.use(passport.session());

//Passport login strategies

passport.use("local-login",new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
},function(req,username,password,done) {
	if(!req.body) {
		return done(null,false,{message:"Please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return done(null,false,{message:"Please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return done(null,false,{message:"Please provide proper credentials"})
	}	
	userModel.findOne({"username":req.body.username},function(err,user) {
			if(err) {
				console.log("Failed to find user. Reason:"+err);
				return done(err)
			}
			if(!user) {
				return done(null,false,{message:"Please provide proper credentials"})
			}
			bcrypt.compare(req.body.password,user.password,function(err,success) {
				if(err) {
					console.log("Failed in comparing passwords. Reason:"+err);
					return done(err)
				}
				if(!success) {
					return done(null,false,{message:"Please provide proper credentials"})
				}
				let token = createToken();
				req.session.token = token;
				req.session.username = username
				return done(null,user);
			})
	})	
}))

passport.serializeUser(function(user,done) {
	done(null,user._id);
})

passport.deserializeUser(function(_id,done) {
	userModel.findById(_id,function(err,user) {
			if(err) {
				return done(err);
			}
			return done(null,user);
		})
})

//HELPERS

createToken = () => {
	const letters = "ABCDEFGHJIKLMNOPabcdefghjklmnop0123456789"
	let token = "";
	for(let i=0;i<512;i++) {
		let temp = Math.floor(Math.random()*letters.length);
		token = token+letters[temp]
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	if(req.isAuthenticated()) {
		if(token === req.session.token) {
			return next();
		}
	}
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	bcrypt.hash(req.body.password,16,function(err,hash) {
			if(err) {
				console.log("Failed to hash password. Reason:"+err);
				return res.status(422).json({message:"please provide proper credentials"})
			}
			let user = new userModel({
				username:req.body.username,
				password:hash
			})
			user.save(function(err,user) {
				if(err) {
					console.log("Register failed. Reason:"+err);
					return res.status(422).json({message:"username already in use"})
				} else {
					console.log("User registered. Username:"+user.username);
					return res.status(200).json({message:"success"});
				}
			})
	})
})


app.post("/login",passport.authenticate("local-login",{failureRedirect:'/'}), function(req,res){
	return res.status(200).json({"token":req.session.token});
})


app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(409).json({message:"conflict"})
	}
	if(req.session) {
		req.logout();
		req.session.destroy();
		return res.status(200).json({message:"success"})
	}
	return res.status(409).json({message:"conflict"}) 
})

app.use("/api",isUserLogged,contactrouter);

app.listen(port);

console.log("Running in port:"+port);