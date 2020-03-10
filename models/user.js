let mongoose = require('mongoose');

let User = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	username: {
		type: String,
		required: true	
	},
	password: {
		type: String,
		required: true	
	}
});

const userModel = mongoose.model('User', User);

module.exports.model = userModel;

module.exports.checkUser = async function (username, password) {
	
	//save user before logging in
	/*
	
	let newUser = new userModel({
		_id: new mongoose.Types.ObjectId(),
		username: username,
		password: password
		
	});
	
	await newUser.save().then(function () {
		console.log(`saved new user:\nusername: ${username}, password: ${password}`);
	});
	
	*/
	
	const query = {
		username: username,
		password: password
	};
	
	const user = await userModel.find(query).exec();
	
	//debuging
	//console.log(user);
	
	
	if(user.length === 1) {
		//debuging
		//console.log('user found');
		const username = user[0].username;
		return username;
		
	}
	else {
		return false;
	}
	
}