module.exports = (page, req, res, info= { message: 'Что-то пошло не так...' }) => {
  console.log(info.message)
  req.flash('info', info)
  res.redirect(page)
}
