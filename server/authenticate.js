
module.exports = function(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.user) {
        console.log('auth was called');
        next();
    } else {
        // if they aren't redirect them to the login page
        console.log('Redirect from AUTH');
        res.redirect('/login');
    }
};
