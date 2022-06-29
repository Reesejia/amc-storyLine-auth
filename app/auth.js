exports.checkLogin = function(req, res,next){
    if(req.headers.cookie){
        next()
    }else {
        // req.flash('error','请先登陆');
        if(isProd){
            res.redirect('/amc-storyline-auth')
        }else {
            res.redirect('/')
        };
    }
}