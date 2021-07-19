const User = require('../models/user');

module.exports.profile =function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title : "User Profile",
                    user : user
                });
            }
        })
    }
    else{
        return res.redirect('/user/sign-in');
    }
}


//render sign up page
module.exports.signUp= function(req,res){
    console.log('here');
    return res.render('user_sign_up',{
        title : "Codeial | Sign up" 
    });
}

//render sign in page
module.exports.signIn= function(req,res){
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
    //steps to authenticate
    //Find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user signing in');
            return;
        }
        //handle user found
        console.log(user);
        if(user){
            //handle password dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/user/profile');
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    })

    
}

//signout button
module.exports.signOut = function(req,res){
    res.cookie('max-age','0');
    res.redirect('/user/sign-in');
}