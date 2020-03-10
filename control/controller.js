const model = require('../models/models');

const user = require('../models/user');

module.exports.home = async function (req,res,next) {
	try {
		let data1 = await model.getData()
		res.render('home', {
			data: data1,
			login: null
		});
	}catch(err){
		next(err);
	}
};

module.exports.create = function (req,res,next) {
	res.render('create', {
		username: req.body.username
	});
};

module.exports.savePost = async function(req,res,next) {
	
	try {
		await model.savePost(req);
	}catch(err){
		next(err);
	}
	
	let data1 = await model.getData();
	let username = req.query.username !== undefined ? req.query.username: null;
	
	if(username) {
		res.render('home', { 
			data: data1,
			login: true,
			name: username,
			viewingMyPosts: false
		});
	}
	else {
		res.render('home', {
			data: data1,
			login: null
		});
	}
	
}

module.exports.login = function (req,res,next) {
	res.render('login');
}

module.exports.checkLogin = async function (req,res,next) {
	
	const username = await user.checkUser(req.body.username, req.body.password);
	
	if(username) {
		let data1 = await model.getData()
		
		res.render('home', {
			data: data1,
			login: true,
			name: username,
			viewingMyPosts: false
		});
		
	}
	else
		res.send('failed login');
	
}

module.exports.viewPosts = async function (req,res,next) {
	try {
		const query = { author: req.body.username };
		
		const data1 = await model.getUserPosts(query);
		
		res.render('home', {
				data: data1,
				login: true,
				name: req.body.username,
				viewingMyPosts: true
		});
	} catch(err) {
		next(err);
	}
		
}

module.exports.viewAllPosts = async function (req,res,next) {
	try {
		const query = {};
		
		const data1 = await model.getUserPosts(query);
		
		res.render('home', {
				data: data1,
				login: true,
				name: req.body.username,
				viewingMyPosts: false
		});
	} catch(err) {
		next(err);
	}
		
}

module.exports.blogPost = async function (req,res,next) {
	try {
		let query = { _id: req.body.id};
		
		const blogpost = await model.getUserPosts(query);
		
		const username1 = req.body.username !== undefined ? req.body.username: null;
		
		
		res.render('blogpost', {
			
			title: blogpost[0].title,
			text: blogpost[0].text,
			author: blogpost[0].author,
			postDate: blogpost[0].date.toString().slice(0,15),
			username: username1
			
		});
	}catch(err){
		next(err);
	}
}




