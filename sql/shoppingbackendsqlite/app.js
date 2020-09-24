const sqlite = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

let db = new sqlite.Database("shopping.db", function(err) {
	if(err) {
		console.log(err);
	}
});

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS shopping (id INTEGER PRIMARY KEY, type VARCHAR(80), price FLOAT, count INTEGER)", function(err) {
		if(err) {
			console.log(err);
			return;
		}
		console.log("Table created if did not exist");
	})
})

app.get("/api/shopping",function(req,res) {
	let sql = "SELECT * FROM shopping";
	db.all(sql, [],function(err, data) {
		if(err) {
			console.log(err);
			return res.status(404).json({message:"not found"})
		}
		return res.status(200).json(data);	
	})
})

app.post("/api/shopping",function(req,res) {
	let sql = "INSERT INTO shopping (type,price,count) VALUES(?,?,?)"
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count
	}
	db.run(sql,[item.type,item.price,item.count], function(err) {
		if(err) {
			console.log(err);
			return res.status(409).json({message:"conflict"})
		}
		return res.status(200).json({message:"success"})
	})
})

app.delete("/api/shopping/:id",function(req,res) {
	let sql = "DELETE FROM shopping WHERE id=?"
	let tempId = parseInt(req.params.id,10);
	db.run(sql, [tempId], function(err) {
		if(err) {
			console.log(err);
			return res.status(409).json({message:"conflict"})
		}
		return res.status(200).json({message:"success"})		
	})
})

app.put("/api/shopping/:id",function(req,res) {
	let sql = "UPDATE shopping SET type=?, price=?, count=? WHERE id=?"
	let tempId = parseInt(req.params.id,10);
	let item = {
		type:req.body.type,
		price:req.body.price,
		count:req.body.count
	}
	db.run(sql, [item.type,item.price,item.count,tempId], function(err) {
		if(err) {
			console.log(err);
			return res.status(409).json({message:"conflict"})
		}
		return res.status(200).json({message:"success"})		
	})	
})
app.listen(3000);

console.log("Running in port 3000");


