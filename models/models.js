let mongoose = require('mongoose');

let Blog = mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: true
	},
	author: {
		type: String,
		required: true,
		default: 'anon'
	}
});

const bmodel = mongoose.model('Blog', Blog);

module.exports.model = bmodel;

module.exports.getData = async function () {
	
	const query = {};

	const search = await bmodel.find(query).exec();
	
	return search;
	
};

module.exports.savePost = async function (req) {
	
	
	let newData = new bmodel({
		_id: new mongoose.Types.ObjectId(),
		date: Date(),
		title: req.query.title,
		text: req.query.text
	})
	
	if(req.query.username !== undefined) 
		newData.author = req.query.username;
	
	await newData.save().then(function() {
		console.log(`Post saved ${newData}`);
	});
	
}

module.exports.getUserPosts = async function (query) {

	const search = await bmodel.find(query).exec();
	
	//debug
	//console.log(search);
	
	return search;
	
};
