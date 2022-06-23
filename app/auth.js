exports.checkLogin = function(req, res,next){
    if(req.headers.cookie){
        next()
    }else {
        // req.flash('error','请先登陆');
        res.redirect('/')
    }
}