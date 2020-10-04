module.exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports.isAuthorized = (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect('/admin')
  } else {
    next()
  }
}
