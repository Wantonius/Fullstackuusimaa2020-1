const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

//login databases

let registeredUsers = [];
let loggedSessions = [];

//databases

let database = [];
let id = 100;

//Helper functions

createToken = () => {
	let token = "";
	let letters = "ABCDEFGHIJabcdefghij0123456789"
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
}

//app.use("/a/api/",isUserLogged);

//Login API

app.post("/a/register",function(req,res) {
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(registeredUsers[i].username === req.body.username) {
			return res.status(409).json({message:"Username already in use"})
		}
	}
	registeredUsers.push(user);
	return res.status(200).json({message:"success"})
})

app.post("/a/login",function(req,res) {
	for(let i=0;i<registeredUsers.length;i++) {
		if(registeredUsers[i].username===req.body.username) {
			if(registeredUsers[i].password === req.body.password) {
				let token = createToken();
				loggedSessions.push({
					token:token,
					username:req.body.username
				})
				return res.status(200).json({
					token:token,
					message:"success"
				})
			}
		}
	}
	return res.status(403).json({message:"wrong username or password"});
})

app.post("/a/logout",function(req,res) {
	let token = req.headers.token;
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

//Shopping API

app.get("/a/api/shopping",function(req,res) {
	console.log("get shoppinglist");
	return res.status(200).json(database);
})

app.post("/a/api/shopping",function(req,res) {
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count
	}
	item.id = id;
	id++;
	database.push(item);
	console.log(database);
	return res.status(200).json({message:"success"})
});

app.delete("/a/api/shopping/:id",function(req,res) {
	console.log(req);
	let id = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			console.log(id);
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.listen(3000);

console.log("Running in port 3000");