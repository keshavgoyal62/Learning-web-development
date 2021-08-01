const Post = require('../../../models/post'); 
const Comment = require('../../../models/comment'); 

module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //.id is a mongoose functionality which converts the object onto string
        //if(post.user==req.user.id){
        console.log("*******here*************");   
        post.remove();
            await Comment.deleteMany({post: req.params.id});


            return res.json(200,{
                message: "post and comments deleted successfully"
            });
        //}
        //else{
        //    req.flash('error','you cannot delete this post');
        //    res.redirect('back');
        //}
    }
    catch(err){
        console.log('***************',err);
        return res.json(500,{
            message: "INTERNAL SERVER ERROR"
        });
    }
}