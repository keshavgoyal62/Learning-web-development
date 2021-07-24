const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success','Post published!');
        return res.redirect('back');
    }
    catch(err){
        console.log('error',err);
        return ;
    }
}

module.exports.destroy = async function(req,res){
        try{
            let post = await Post.findById(req.params.id)
            //.id is a mongoose functionality which converts the object onto string
            if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                req.flash('success','Post Deleted!');
                return res.redirect('back');
            }
            else{
                req.flash('error','you cannot delete this post');
                res.redirect('back');
            }
        }
        catch(err){
            console.log('error',err);
            return;
        }
}