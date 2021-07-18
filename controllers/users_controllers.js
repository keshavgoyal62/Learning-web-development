module.exports.profile =function(req,res){
    return res.render('user_profile',{
        title: "User Profile"
    });
}


//render sign up page
module.exports.signUp= function(req,res){
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
module.exports.create=function(req,res){
    //TODO LATER
}

//create the sign in session
module.exports.create=function(req,res){
    //TODO LATER
}