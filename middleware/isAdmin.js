const isAdmin = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect('/login');
    }

    if (res.locals.user.role !== 'Admin') {
        return res.redirect('/home');
    }

    next();
};

export default isAdmin;
