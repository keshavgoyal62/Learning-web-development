const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
            if(post){
                let comment= await Comment.create({
                    content : req.body.content,
                    post : req.body.post,
                    user: req.user._id
                });
                    post.comments.push(comment);
                    post.save();
                    req.flash('success','Comment created');
                    return res.redirect('/');
            }
    }
    catch(err){
        req.flash('error',err);
        return ;
    }
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id)
            //.id is a mongoose functionality which converts the object onto string
            if(comment.user==req.user.id){
                let postId=comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}},function(err,post){
                    req.flash('success','Comment deleted');
                    return res.redirect('back');
                })
            }
            else{
                req.flash('error','you cant delete the Comment');
                return res.redirect('back');
            }
    }
    catch(err){
        req.flash('error',err);
        return ;
    }
}