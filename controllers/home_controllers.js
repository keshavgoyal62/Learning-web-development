const { populate } = require('../models/post');
const Post = require('../models/post');

module.exports.home =function(req,res){
    //res.cookie('user_id',25);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts
    //     });
    // })

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Home",
            posts: posts
        });
    })
}

// module.exports.actionName = funtion(req,res){} 