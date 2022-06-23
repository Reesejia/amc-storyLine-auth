exports.checkLogin = function(req, res,next){
    console.log('checkLogin')
    console.log(' req.sessionxxx', req.headers.cookie)
    if(req.headers.cookie){
        next()
    }else {
        // req.flash('error','请先登陆');
        res.redirect('/')
    }
}