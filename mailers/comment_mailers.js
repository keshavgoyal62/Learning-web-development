const nodemailer = require('../config/nodemailer');


//this is another way of exporting a method
exports.newComment =  (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');


    nodemailer.transporter.sendMail({
        from: 'goyalkeshav999@gmail.com',
        to: comment.user.email,
        subject: "New Comment Pusblished!",
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}