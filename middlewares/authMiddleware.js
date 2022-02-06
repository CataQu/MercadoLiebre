function authMiddleware(req, res, next) {
    if (req.session.loggedUser){
        res.redirect('/user/profile')
    }
}

module.exports = authMiddleware;