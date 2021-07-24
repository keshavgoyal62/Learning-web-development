const User = require('../models/user');

module.exports.profile =function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    })
    
}

module.exports.update = function(req,res){
    if(req.isAuthenticated()){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}


//render sign up page
module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{
        title : "Codeial | Sign up" 
    });
}

//render sign in page
module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{
        title : "Codeial | Sign in" 
    });
}

//get the sign up data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_passowrd){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in finding user signing up');
                    return;
                }
                return res.redirect('/user/sign-in');
            })
        }
        else{
            return res.redirect('/user/sign-in');
        }
    });
}

//create the sign in session
module.exports.create_session=function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have Logged out!');
    return res.redirect('/')
} 