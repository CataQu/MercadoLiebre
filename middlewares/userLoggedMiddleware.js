const Users = require('../models/Users.js');

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    let userInCookie = Users.findByEmail(emailInCookie)

    if(userInCookie){
        req.session.loggedUser = userInCookie
    }
    
    
    if(req.session.loggedUser){
        res.locals.isLogged = true;
        res.locals.loggedUser = req.session.loggedUser;
    }
    next();
}

module.exports = userLoggedMiddleware;