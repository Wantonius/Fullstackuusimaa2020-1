const express = require("express");
const mongoose = require("mongoose");
const contactModel = require("../models/contact");

let router = express.Router();

/*
Data structure

let contact = {
	firstname:String,
	lastname:String,
	nickname:String,
	title:String,
	phone:List,
	mobile:List,
	email:List,
	street:String,
	postcode:String,
	city:String,
	country:String,
	id:database_id
}
*/

//REST API

router.get("/contact",function(req,res) {
	let query = {"user":req.session.user}
	contactModel.find(query,function(err,contacts) {
		if(err) {
			console.log("Find contacts failed. Reason:"+err);
			return res.status(404).json({message:"not found"})
		}
		if(!contacts) {
			return res.status(200).json([])
		}
		return res.status(200).json(contacts);
	})
});

router.post("/contact",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
		return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length === 0) {
		return res.status(422).json({message:"provide required data"})
	}
	let contact = new contactModel({
		user:req.session.user,
		owner:req.session.username,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		title:req.body.title,
		nickname:req.body.nickname,
		phone:req.body.phone,
		mobile:req.body.mobile,
		email:req.body.email,
		street:req.body.street,
		postcode:req.body.postcode,
		city:req.body.city,
		country:req.body.country
	})
	contact.save(function(err,contact) {
		if(err) {
			console.log("Failed to save contact. Reason:"+err);
			return res.status(409).json({message:"not saved"})
		}
		if(!contact) {
			return res.status(409).json({message:"not saved"})
		}
		return res.status(200).json({message:"success!"})
	})
});

router.delete("/contact/:id",function(req,res) {
	let tempid = req.params.id
	contactModel.findById(tempid,function(err,contact) {
		if(err) {
			console.log("Failed to find contact to delete. Reason:"+err);
			return res.status(404).json({message:"not found"})
		}
		if(!contact) {
			return res.status(404).json({message:"not found"})
		}
		if(contact.user === req.session.user) {
			contactModel.deleteOne({"_id":contact._id}, function(err){
				if(err) {
					console.log("Failed to delete contact. Reason:"+err);
					return res.status(409).json({message:"conflict"})
				}
				return res.status(200).json({message:"success"})
			})
		} else {
			return res.status(409).json({message:"conflict"})
		}	
	})
})

router.put("/contact/:id",function(req,res) {
	let id = req.params.id
	console.log(req.body);
	if(!req.body) {
		return res.status(422).json({message:"provide required data"})
	}
	if(!req.body.firstname || !req.body.lastname) {
		return res.status(422).json({message:"provide required data"})
	}
	if(req.body.firstname.length === 0 || req.body.lastname.length === 0) {
		return res.status(422).json({message:"provide required data"})
	}
	let contact = {
		user:req.session.user,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		title:req.body.title,
		nickname:req.body.nickname,
		phone:req.body.phone,
		mobile:req.body.mobile,
		email:req.body.email,
		street:req.body.street,
		postcode:req.body.postcode,
		city:req.body.city,
		country:req.body.country
	}
	contactModel.findById(id,function(err,con) {
		if(err) {
			console.log("Error finding contact to edit. Reason"+err);
			return res.status(404).json({message:"not found"})
		}
		if(!con) {
			return res.status(404).json({message:"not found"})
		}
		if(req.session.user == contact.user) {
			contactModel.replaceOne({"_id":id},contact,function(err) {
				if(err) {
					console.log("Failed to update contact. Reason:"+err)
					return res.status(409).json({message:"conflict"})
				}
				return res.status(200).json({message:"success"})
			})
		} else {
			return res.status(409).json({message:"conflict"})
		}
	})
	

})

module.exports = router;