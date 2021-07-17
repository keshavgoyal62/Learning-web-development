module.exports.home =function(req,res){
    return res.render('home',{
        title: "Home"
    });
}

// module.exports.actionName = funtion(req,res){} 