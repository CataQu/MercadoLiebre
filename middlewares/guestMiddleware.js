function guestMiddleware (req, res, next) {
    if (!req.session.loggedUser){
        res.redirect('/user/login')
    }
    next();
}
module.exports = guestMiddleware;