function guestMiddleware (req, res, next) {
    if (!req.session.loggedUser){
        res.redirect('/user/login')
    }
}
module.exports = guestMiddleware;