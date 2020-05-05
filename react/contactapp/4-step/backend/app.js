const express = require("express");
const bodyParser = require("body-parser");
const contactrouter = require("./routes/contactrouter");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

let app = express();
let port = process.env.PORT || 3001

app.use(bodyParser.json());

//USER MANAGEMENT

const time_to_live_diff = 1000*60*60

//database

mongoose.connect("mongodb://localhost/fullstackuusimaacontactdatabase").then(
	() => console.log("Connection to MongoDB successful"),
	(error) => console.log("Failed to connect to MongoDB. Reason:"+error)
);

/*
	SESSION DATA
	"username":String,
	"ttl":Number,
	"token":String
*/

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
	sessionModel.findOne({"token":token},function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason:"+err);
			return res.status(403).json({message:"forbidden"})
		}
		if(!session) {
			return res.status(403).json({message:"forbidden"})
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id},function() {
				if(err) {
					console.log("Failed to remove session. Reason:"+err);
				}
				return res.status(403).json({message:"forbidden"})
			})
		} else {
			req.session = {}
			req.session.user = session.user
			session.ttl = now+time_to_live_diff
			session.save(function(err) {
				if(err) {
					console.log("Failed to save session:"+err)
				}
				return next();
			})
		}
	})
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


app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(422).json({message:"please provide proper credentials"})
	}
	userModel.findOne({"username":req.body.username},function(err,user) {
			if(err) {
				console.log("Failed to find user. Reason:"+err);
				return res.status(403).json({message:"Username or password incorrect"})
			}
			if(!user) {
				return res.status(403).json({message:"Username or password incorrect"})
			}
			bcrypt.compare(req.body.password,user.password,function(err,success) {
				if(err) {
					console.log("Failed in comparing passwords. Reason:"+err);
					return res.status(403).json({message:"Username or password incorrect"})
				}
				if(!success) {
					return res.status(403).json({message:"Username or password incorrect"})
				}
				let token = createToken();
				let temp = Date.now();
				let session = new sessionModel({
					user:user.username,
					token:token,
					ttl:temp+time_to_live_diff
				})
				session.save(function(err,session) {
					if(err) {
						console.log("Session creation failed. Reason:"+err);
						return res.status(403).json({message:"Username or password incorrect"})
					}
					return res.status(200).json({token:token})
				})
			})	
	})
})


app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(409).json({message:"conflict"})
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			console.log("Failed to find session while logging out. Reason:"+err);
			return res.status(409).json({message:"conflict"})
		}
		if(!session) {
			return res.status(404).json({message:"not found"})
		}
		sessionModel.deleteOne({"_id":session._id}, function(err) {
			if(err) {
				console.log("Failed to remove session while logging out. Reason:"+err);
			}
			return res.status(200).json({message:"success"})
		})
	})
})

app.use("/api",isUserLogged,contactrouter);

app.listen(port);

console.log("Running in port:"+port);