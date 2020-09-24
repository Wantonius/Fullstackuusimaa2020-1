let mysql = require("mysql");
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

const time_to_life_diff = 36000000;

//middleware

createToken = () => {
	let letters = "abcdefghijABCDEFGHIJ0123456789"
	let token = "";
	for(let i=0;i<128;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp];
	}
	return token;
}

let con = mysql.createConnection({
	host:"localhost",
	user:"test",
	password:"test",
	database:"shopping"
})

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	let sql = "SELECT * from sessions WHERE token='"+token+"'";
	con.query(sql, function(err,result) {
		if(err) {
			return res.status(500).json({message:"database failure"});
			throw err;
		}
		if(result.length === 0) {
			return res.status(403).json({message:"forbidden"})
		}
		let now = new Date().getTime();
		let session = result[0];
		if(now > session.ttl) {
			sql = "DELETE FROM sessions WHERE token='"+token+"'";
			con.query(sql, function(err) {
				return res.status(403).json({message:"forbidden"})
			})
		} else {
			req.session = {};
			req.session.user = session.user;
			let ttl = now+time_to_life_diff;
			sql = "UPDATE sessions SET ttl="+ttl+" WHERE token='"+token+"'";
			con.query(sql,function(err) {
				return next();
			})
		}
	})
}

con.connect(function(err){
	if(err) throw err;
	let sql = "CREATE TABLE IF NOT EXISTS shoppingitems (id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(80), price FLOAT, count INT, user VARCHAR(80))"
	con.query(sql,function(err,result) {
		if(err) throw err;
		console.log("Created shoppingitems table if did not exists:",result);
	})
	sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(80) UNIQUE, password VARCHAR(80))"
	con.query(sql,function(err,result) {
		if(err) throw err;
		console.log("Created users table if did not exists:",result);
	})	
	sql = "CREATE TABLE IF NOT EXISTS sessions (id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(80), token VARCHAR(512), ttl BIGINT)" 
	con.query(sql,function(err,result) {
		if(err) throw err;
		console.log("Created sessions table if did not exists:",result);
	})	
})

//LOGIN API

app.post("/a/register",function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({"message":"please provide proper information"})
	}
	if(req.body.username < 4|| req.body.password < 8) {
		return res.status(422).json({"message":"please provide proper information"})
	}	
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	let sql = "INSERT INTO users (username,password) VALUES ('"+user.username+"','"+user.password+"')"
	con.query(sql, function(err,result) {
		if(err) {
			if(err.errno === 1062) {
				return res.status(409).json({message:"username already in use"});
			}
			return res.status(500).json({message:"database failure"});
			throw err;
		}
		console.log(result);
		return res.status(200).json({message:"success"})
	})
})

app.post("/a/login",function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({"message":"please provide proper information"})
	}
	if(req.body.username < 4|| req.body.password < 8) {
		return res.status(422).json({"message":"please provide proper information"})
	}	
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	let sql = "SELECT * from users WHERE username='"+user.username+"'";
	con.query(sql, function(err,result) {
		if(err) {
			res.status(500).json({message:"database returned an error"});
			throw err;
		};
		console.log(result);
		if(result.length === 0) {
			return res.status(403).json({"message":"forbidden"});	
		}
		if(result[0].password === user.password) {
			let token = createToken();
			let time_to_live = new Date().getTime() + time_to_life_diff;
			sql = "INSERT INTO sessions (user,token,ttl) values ('"+result[0].username+"','"+token+"',"+time_to_live+")"
			con.query(sql, function(err) {
				if(err){
					return res.status(500).json({message:"database failure"});
					throw err;
				}	
				return res.status(200).json({token:token})	
			})		
		} else {
			return res.status(403).json({"message":"forbidden"});	
		}
		
	})
})

app.use("/a/api",isUserLogged);

// SHOPPING API
app.get("/a/api/shopping",function(req,res) {
	let sql = "SELECT id,type,price,count FROM shoppingitems WHERE user='"+req.session.user+"'";
	con.query(sql, function(err,result, fields) {
		if(err) {
			res.status(500).json({message:"database returned an error"});
			throw err;
		};
		return res.status(200).json(result);
	})
})

app.post("/a/api/shopping",function(req,res) {
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count,
		user:req.session.user
	}
	let sql = "INSERT INTO shoppingitems (type,price,count,user) VALUES ('"+item.type+"',"+item.price+","+item.count+",'"+item.user+"')"
	con.query(sql, function(err,result) {
		if(err) {
			res.status(500).json({message:"database returned an error"});
			throw err;
		};
		return res.status(200).json({message:"success"})
	})
})

app.delete("/a/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let sql = "DELETE FROM shoppingitems WHERE id="+tempId+" AND user='"+req.session.user+"'";
	con.query(sql,function(err,result) {
		if(err) {
			res.status(500).json({message:"database returned an error"});
			throw err;
		};
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"})
	})
})

app.put("/a/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count
	}
	let sql = "UPDATE shoppingitems SET type='"+item.type+"',price="+item.price+",count="+item.count+" WHERE id="+tempId+" AND user='"+req.session.user+"'";
	con.query(sql,function(err,result) {
		if(err) {
			res.status(500).json({message:"database returned an error"});
			throw err;
		};
		if(result.affectedRows === 0) {
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json({message:"success"})
	})
})

let port = 3000 || process.env.PORT;

app.listen(port);

console.log("Running in "+port);